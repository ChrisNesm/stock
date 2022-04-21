from typing import Any, Dict, Optional, Union
from fastapi.encoders import jsonable_encoder
from sqlalchemy.orm import Session
from sqlalchemy import or_

from app.crud.base import CRUDBase
from app import models, schemas, crud



class CRUDOrder(CRUDBase[models.Order, schemas.OrderCreate, schemas.OrderUpdate]):
    def create(self, db: Session, order_in: schemas.OrderCreate, article: models.Article, seller: models.User) -> schemas.OrderRetrieve:
        order = schemas.OrderSystemCreate(
            orderer_id = seller.id,
            article_id = article.id,
            unit_price = article.unit_price,
            order_quantity = order_in.order_quantity,
            status = schemas.OrderStatus.PENDING
        )
        obj_in_data = jsonable_encoder(order)
        obj_in_data
        db_obj = self.model(**obj_in_data)  # type: ignore
        db.add(db_obj)
        
        article.pending_quantity -= order_in.order_quantity
        db.add(article)

        db.commit()
        
        db.refresh(db_obj)
        db.refresh(article)

        return db_obj

    def list_initiated(self, db: Session, seller: models.User):
        """
        A seller can see its orders
        """
        return db.query(self.model)\
            .filter(self.model.orderer_id == seller.id).all()

    def list_hosted(self, db: Session, manager: models.User):
        return db.query(self.model)\
            .filter(self.model.article_id.in_(
                [ a.id for a in crud.article.list_managed(db= db, manager= manager) ]
            )).all()

    def list_per_warehouse(self, db: Session, warehouse: models.Warehouse, manager: models.User):
        """
        A warehouse manager should see orders that involve one of its articles
        """
        return db.query(self.model)\
            .filter(self.model.article_id.in_(
                [ a.id for a in crud.article.list_managed(db= db, manager= manager) ]
            )).all()

    def validate(self, db: Session, order: models.Order):
        """
        Confirm an order
        """
        order.status = schemas.order.OrderStatus.DONE
        db.add(order)
        db.commit()
        db.refresh(order)
        return order

    def reject(self, db: Session, order: models.Order):
        """
        Reject an order
        """
        order.status = schemas.order.OrderStatus.REJECTED
        db.add(order)
        db.commit()
        db.refresh(order)
        return order   

    def cancel(self, db: Session, order: models.Order):
        """
        Cancel an order
        """
        order.status = schemas.order.OrderStatus.CANCELLED
        db.add(order)
        db.commit()
        db.refresh(order)
        return order
    
    def filter(
        self,
        db: Session,
        status: Optional[str]= None
        ) -> Any:
        if status :
            res = db.query(self.model).filter(self.model.status == status).all()
            return res


order = CRUDOrder(models.Order)
