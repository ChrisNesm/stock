from typing import Any, List, Optional

from fastapi import APIRouter, Body, Depends, HTTPException
from fastapi.encoders import jsonable_encoder
from sqlalchemy.orm import Session

from app import crud, models, schemas
from app.api import deps

router = APIRouter()


@router.post("/", response_model=schemas.OrderRetrieve)
def create(
    *,
    db: Session = Depends(deps.get_db),
    order_in: schemas.OrderCreate,
    seller: models.User = Depends(deps.get_current_active_store_manager),
):
    """
    Create new article.
    """
    if order_in.order_quantity <= 0 :
        print(1)
        raise HTTPException(
            status_code=400,
            detail="La quantité de la commande doit être supérieure à 0",
        )
    related_article = crud.article.get(db= db , id= order_in.article_id)
    if not related_article :
        print(2)
        raise HTTPException(
            status_code=400,
            detail="Article inexistant",
        )
    if related_article.pending_quantity <  order_in.order_quantity:
        print(3)
        raise HTTPException(
            status_code=400,
            detail="Stock insuffisant pour créer votre commande",
        )
    return crud.order.create(db, order_in = order_in, article= related_article, seller = seller)


@router.get("/", response_model= schemas.OrderRead)
def read_managed(
    db: Session = Depends(deps.get_db),
    seller: models.User = Depends(deps.get_current_active_seller_or_store_manager),
):
    """
    List all orders I initiated
    """
    orders = crud.order.list_initiated(db= db, seller= seller)
    return schemas.OrderRead(results= orders, total= len(orders))

@router.get("/hosted", response_model= schemas.OrderRead)
def read_hosted(
    warehouse_id: Optional[int] = None,
    db: Session = Depends(deps.get_db),
    manager: models.User = Depends(deps.get_current_active_seller_or_store_manager),
):
    """
    List all orders that implie my warehouse. 
    For managers
    """
    if not warehouse_id:
        orders = crud.order.list_hosted(db= db, manager= manager)
    else :
        warehouse = crud.warehouse.get(db= db, id = warehouse_id)
        if not warehouse :
            raise HTTPException(
            status_code=400,
            detail="Magasin inexistant",
        )
        orders = crud.order.list_per_warehouse(db= db, warehouse = warehouse, manager= manager)
    return schemas.OrderRead(results= orders, total= len(orders))


@router.get("/{order_id}", response_model=schemas.OrderRetrieve)
def retrieve(
    order_id: int,
    db: Session = Depends(deps.get_db),
    current_user: models.User = Depends(deps.get_current_active_user),
) -> Any:
    """
    Retrieve an article.
    """
    order = crud.order.get(db= db, id= order_id)
    if not order:
        raise HTTPException(
            status_code=400,
            detail="Commande inexistant",
        )
    return order

@router.get("/{order_id}/validate", response_model=schemas.OrderRetrieve)
def validate_order(
    order_id: int,
    db: Session = Depends(deps.get_db),
    current_user: models.User = Depends(deps.get_current_active_store_manager),
) -> Any:
    """
    Validate an artiordercle.
    """
    order = crud.order.get(db= db, id= order_id)
    if not order:
        raise HTTPException(
            status_code=400,
            detail="Commande inexistant",
        )
    warehouse = crud.warehouse.get(db= db, id= crud.article.get(db= db, id= order.article_id).warehouse_id)
    if not crud.warehouse.is_user_manager_of(warehouse):
        raise HTTPException(
            status_code=400,
            detail="Vous n'êtes pas habilité à valider cette commande",
        )
    crud.order.validate(db= db, order= order)
    return order

@router.get("/{order_id}/cancel", response_model=schemas.OrderRetrieve)
def cancel_order(
    order_id: int,
    db: Session = Depends(deps.get_db),
    seller: models.User = Depends(deps.get_current_active_seller_or_store_manager),
) -> Any:
    """
    Cancel an order.
    Only for the initiator and one of the warehouse managers
    """
    order = crud.order.get(db= db, id= order_id)
    if not order:
        raise HTTPException(
            status_code=400,
            detail="Commande inexistant",
        )
    if order.orderer_id != seller.id :
        raise HTTPException(
            status_code=400,
            detail="Seul le créateur d'une commande peut l'annuler",
        )
    crud.order.reject(db= db, order= order)
    return order

@router.get("/{order_id}/reject", response_model=schemas.OrderRetrieve)
def reject_order(
    order_id: int,
    db: Session = Depends(deps.get_db),
    current_user: models.User = Depends(deps.get_current_active_seller_or_store_manager),
) -> Any:
    """
    Cancel an order.
    Only for the initiator and one of the warehouse managers
    """
    order = crud.order.get(db= db, id= order_id)
    if not order:
        raise HTTPException(
            status_code=400,
            detail="Commande inexistante",
        )
    warehouse = crud.warehouse.get(db= db, id= crud.article.get(db= db, id= order.article_id).warehouse_id)
    if not (crud.warehouse.is_user_manager_of(warehouse) or order.orderer_id != current_user.id ):
        raise HTTPException(
            status_code=400,
            detail="Vous n'êtes pas habilité à valider cette commande",
        )
    crud.order.reject(db= db, order= order)
    return order
