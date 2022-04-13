from typing import Any, Dict, Optional, Union
from fastapi.encoders import jsonable_encoder
from sqlalchemy.orm import Session

from app.crud.base import CRUDBase
from app import models, schemas, crud



class CRUDArticle(CRUDBase[models.Article, schemas.article.ArticleCreate, schemas.article.ArticleUpdate]):
        
    def list_per_store(self, db: Session, store: models.Store):
        warehouses = db.query(models.Warehouse).filter(models.Warehouse.store_id == store.id).all()
        if warehouses :
            return db.query(self.model).filter(self.model.warehouse_id.in_([ w.id for w in warehouses ]), 
                self.model.is_active == True).all()
        return []
    def list_per_warehouse(self, db: Session, warehouse: models.Warehouse):
        return db.query(self.model)\
            .filter(self.model.warehouse_id == warehouse.id).all()

    def list_managed(self, db: Session, manager: models.User):
        warehouses = crud.warehouse.list_managed(db= db, manager= manager)
        if warehouses:
            return db.query(self.model)\
                .filter(self.model.warehouse_id.in_([w.id for w in warehouses])).all()
        return []
article = CRUDArticle(models.Article)
