from typing import Any, Dict, Optional, Union
from fastapi.encoders import jsonable_encoder
from sqlalchemy.orm import Session

from app.crud.base import CRUDBase
from app import models, schemas, crud


class CRUDStore(CRUDBase[models.Store, schemas.store.StoreCreate, schemas.store.StoreUpdate]):

    def create(self, db: Session, *, obj_in: schemas.StoreCreate, owner: models.User):
        obj_in.owner = owner.id
        created_store = super().create(db= db, obj_in= obj_in)
        crud.user.set_as_manager(db= db, user = owner)
        crud.user.set_ownership(db= db, user = owner)

        crud.warehouse.create_default(db= db, store_owner= owner, store= created_store)

        return created_store

    def get_identic(self, db: Session, name: str, owner: models.User):
        return db.query(self.model).filter(self.model.name == name, self.model.owner == owner).first()

    def list_mine(self, db: Session, owner: models.User):
        return db.query(self.model).filter(self.model.owner == owner.id).all()
    
    def list_managed(self, db: Session, manager: models.User):
        return db.query(self.model)\
            .join(models.Warehouse)\
            .filter(models.Warehouse.managers.contains(manager), self.model.is_active == True).all()

    # def list_managers_related_to_all_my_stores(self, db: Session, owner: models.User):
    #     return crud.user.list_managers_related_to_owner(db= db, owner= owner)

    # def list_managers_related_to_one_store(self, db: Session, store: models.Store):
    #     crud.user.list_managers_related_to_store(db= db, store= store)
    #     db.query()
    
store = CRUDStore(models.Store)
