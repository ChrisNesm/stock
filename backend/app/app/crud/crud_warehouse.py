from typing import Any, Dict, Optional, Union
from fastapi.encoders import jsonable_encoder
from sqlalchemy.orm import Session

from app.crud.base import CRUDBase
from app import models, schemas, crud



class CRUDWarehouse(CRUDBase[models.Warehouse, schemas.warehouse.WarehouseCreate, schemas.warehouse.WarehouseUpdate]):
    def create(self, db: Session, *, obj_in: schemas.WarehouseCreate, store_owner: models.User):
        created_warehouse = super().create(db= db, obj_in= obj_in)
        self.add_manager(db= db, warehouse= created_warehouse, manager= store_owner)

        return created_warehouse
    
    def create_default(self, db: Session, *,  store_owner: models.User, store: models.Store):
        warehouse_schema = schemas.WarehouseCreate(
            name= "Mon premier magasin",
            address= "Sans addresse",
            store_id= store.id,
        )
        
        return self.create(db= db, obj_in= warehouse_schema, store_owner= store_owner)

    def add_manager(self, db: Session, warehouse: models.Warehouse, manager: models.User):
        print(dir(warehouse.managers), warehouse.managers)
        warehouse.managers.append(manager)
        db.add(warehouse)
        db.commit()
        db.refresh(warehouse)

        crud.user.set_as_manager(db= db, user = manager)
        
    def get_identic(self, db: Session, name: str, owner: models.User):
        return db.query(self.model).filter(self.model.name == name, self.model.owner == owner).first()

    def list_owned(self, db: Session, store: models.Store, store_owner: models.User):
        return db.query(self.model).filter(self.model.store_id == store.id).all()

    def list_managed(self, db: Session, manager: models.User):
        return db.query(self.model)\
            .filter(models.Warehouse.managers.contains(manager)).all()

    def list_related_to_store(self, db: Session, store: models.Store):
        return db.query(self.model)\
            .filter(models.Warehouse.store_id == store.id).all()    

    def is_user_manager_of(self, db: Session, warehouse: models.Warehouse, user: models.User):
        return db.query(self.model).filter(models.Warehouse.managers.contains(user)).first() and True


warehouse = CRUDWarehouse(models.Warehouse)
