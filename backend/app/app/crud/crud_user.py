from typing import Any, Dict, Optional, Union
from fastapi.encoders import jsonable_encoder
from sqlalchemy.orm import Session

from app.core.security import get_password_hash, verify_password
from app.crud.base import CRUDBase
from app.models.user import User
from app.schemas.user import UserCreate, UserUpdate
from app import schemas, models, crud

class CRUDUser(CRUDBase[User, UserCreate, UserUpdate]):
    def get_by_email(self, db: Session, *, email: str) -> Optional[User]:
        return db.query(User).filter(User.email == email).first()

    def create(self, db: Session, *, obj_in: UserCreate) -> User:
        obj_in_data = jsonable_encoder(obj_in)
        obj_in_data['hashed_password'] = get_password_hash(obj_in_data['password'])
        del obj_in_data['password']
        if obj_in_data['is_owner'] :
            obj_in_data['is_manager'] = True
        db_obj = self.model(**obj_in_data)  # type: ignore
        db.add(db_obj)
        db.commit()
        db.refresh(db_obj)
        return db_obj

    def update(
        self, db: Session, *, db_obj: User, obj_in: Union[UserUpdate, Dict[str, Any]]
    ) -> User:
        if isinstance(obj_in, dict):
            update_data = obj_in
        else:
            update_data = obj_in.dict(exclude_unset=True)
        if update_data.get("password"):
            hashed_password = get_password_hash(update_data["password"])
            del update_data["password"]
            update_data["hashed_password"] = hashed_password
        return super().update(db, db_obj=db_obj, obj_in=update_data)

    def authenticate(self, db: Session, *, email: str, password: str) -> Optional[User]:
        user = self.get_by_email(db, email=email)
        if not user:
            return None
        if not verify_password(password, user.hashed_password):
            return None
        return user
    
    def set_as_manager(self, db: Session, user: User, val: bool = True) -> bool:
        user.is_manager = val
        db.add(user)
        db.commit()
        db.refresh(user)
        return user

    def set_ownership(self, db: Session, user: User, val: bool = True) -> bool:
        user.is_owner = val
        db.add(user)
        db.commit()
        db.refresh(user)
        return user

    def is_active(self, user: User) -> bool:
        return user.is_active

    def is_superuser(self, user: User) -> bool:
        return user.is_superuser

    def is_store_manager(self, user: User) -> bool:
        return user.is_manager
   
    def is_seller(self, user: User) -> bool:
        return user.is_seller

    def is_store_owner(self, user: User) -> bool:
        return user.is_owner

    # def list_managers_related_to_warehouse(self, db: Session, warehouse: models.Warehouse):
    #     return  db.query(self.model)\
    #         .join(models.Warehouse)\
    #         .filter(models.Warehouse.id == warehouse.id)

    # def list_managers_related_to_store(self, db: Session, store: models.Store):
    #     return db.query(self.model)\
    #         .join(models.Warehouse)\
    #         .filter(models.Warehouse.store_id == store.id)\
    #             .all()

    # def list_managers_related_to_owner(self, db: Session, owner: models.User):
    #     """
    #     List all the users who are managers in a store belonging to another one
    #     """
    #     stores = crud.store.list_managed(db= db, manager= owner)
    #     for s in stores :
    #         self.list_managers_related_to_store(db= db, store= s)

        

user = CRUDUser(User)
