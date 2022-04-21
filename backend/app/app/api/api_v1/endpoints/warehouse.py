from typing import Any, List

from fastapi import APIRouter, Body, Depends, HTTPException
from fastapi.encoders import jsonable_encoder
from sqlalchemy.orm import Session

from app import crud, models, schemas
from app.api import deps

router = APIRouter()


@router.post("/", response_model=schemas.WarehouseRetrieve)
def create(
    *,
    db: Session = Depends(deps.get_db),
    warehouse_in: schemas.WarehouseCreate,
    store_owner: models.User = Depends(deps.get_current_active_user),
):
    """
    Create new warehouse.
    """
    store = crud.store.get(db= db, id= warehouse_in.store_id)
    if  not store :
        raise HTTPException(
            status_code=400,
            detail="Le magasin associé n'existe pas",
        )
    if store.owner != store_owner.id :
        raise HTTPException(
            status_code=400,
            detail="Vous n'est pas propriétaire du magasin",
        )
    return crud.warehouse.create(db, obj_in = warehouse_in, store_owner= store_owner)


@router.get("/all", response_model= schemas.WarehouseRead)
def read_all(
    db: Session = Depends(deps.get_db),
    filtered: List = Depends(deps.filter_warehouses),
    su: models.User = Depends(deps.get_current_active_superuser),
):
    """
    List all warehouses. SU option
    """
    if filtered:
        print(len(filtered))
        return schemas.WarehouseRead(results= filtered, total= len(filtered))

    stores = crud.warehouse.get_all(db= db)
    return schemas.WarehouseRead(results= stores, total= len(stores))


@router.get("/many", response_model= schemas.WarehouseRead)
def read_many(
    ids: str,
    db: Session = Depends(deps.get_db),
    current_user: models.User = Depends(deps.get_current_active_user),
):
    """
    List many article based on ids
    """
    ids = [ int(i) for i in ids.split(',') if i]
    articles = crud.warehouse.get_many(db= db, ids= ids)
    return schemas.WarehouseRead(results= articles, total= len(articles))


@router.get("/owned", response_model= schemas.WarehouseRead)
def read_owned(
    store_id: int,
    db: Session = Depends(deps.get_db),
    owner: models.User = Depends(deps.get_current_active_user),
):
    """
    List the warehouses I own.
    """
    store = crud.store.get(db= db, id= store_id)
    if  not store :
        raise HTTPException(
            status_code=400,
            detail="Magasin inexistant",
        )
    if store.owner != owner.id :
        raise HTTPException(
            status_code=400,
            detail="Vous n'est pas propriétaire du magasin",
        )
    warehouses = crud.warehouse.list_owned(db= db, store_owner= owner, store = store)

    # crud.warehouse.add_manager(db= db, warehouse= warehouses[0], manager= owner)
    # return warehouses
    return schemas.WarehouseRead(results= warehouses, total= len(warehouses))

@router.get("/", response_model= schemas.WarehouseRead )
def read_managed(
    db: Session = Depends(deps.get_db),
    current_manager: models.User = Depends(deps.get_current_active_seller_or_store_manager),
):
    """
    List all warehouses I manage.
    """
    warehouses = crud.warehouse.list_managed(db= db, manager= current_manager)
    return schemas.WarehouseRead(results= warehouses, total= len(warehouses))

@router.get("/{warehouse_id}/add-manager", response_model= schemas.User )
def add_manager(
    user_id: int,
    warehouse_id: int,
    db: Session = Depends(deps.get_db),
    current_manager: models.User = Depends(deps.get_current_active_store_manager),
):
    """
    Append a user to warehouse managers list
    """
    warehouse = crud.warehouse.get(db= db, id= warehouse_id)
    future_manager = crud.user.get(db= db, id= user_id)
    if not future_manager :
        raise HTTPException(
            status_code=400,
            detail="L'utilisateur que vous voulez ajouter n'existe pas encore sur la plateforme",
        )
    if not crud.warehouse.is_user_manager_of(db= db, warehouse= warehouse, user = current_manager) :
        raise HTTPException(
            status_code=400,
            detail="Vous n'êtes pas habilité à ajouter des gestionnaires dans magasin",
        )
    warehouses = crud.warehouse.add_manager(db= db, warehouse= warehouse, manager= future_manager)
    return future_manager

@router.get("/{warehouse_id}/remove-manager", response_model= schemas.User )
def remove_manager(
    user_id: int,
    warehouse_id: int,
    db: Session = Depends(deps.get_db),
    current_manager: models.User = Depends(deps.get_current_active_store_manager),
):
    """
    Append a user to warehouse managers list
    """
    warehouse = crud.warehouse.get(db= db, id= warehouse_id)
    previous_manager = crud.user.get(db= db, id= user_id)
    if not previous_manager :
        raise HTTPException(
            status_code=400,
            detail="L'utilisateur que vous voulez retirer n'existe pas encore sur la plateforme",
        )
    if not crud.warehouse.is_user_manager_of(db= db, warehouse= warehouse, user = current_manager) :
        raise HTTPException(
            status_code=400,
            detail="Vous n'êtes pas habilité à retirer des gestionnaires dans magasin",
        )
    if crud.warehouse.is_user_owner_of(db= db, warehouse=warehouse, user= previous_manager ) :
        raise HTTPException(
            status_code=400,
            detail="Personne ne peut retirer l'accès au propriétaire de la boutique",
        )
    warehouses = crud.warehouse.remove_manager(db= db, warehouse= warehouse, manager= previous_manager)
    return previous_manager
    
@router.get("/{warehouse_id}", response_model=schemas.WarehouseRetrieve)
def retrieve(
    warehouse_id: int,
    db: Session = Depends(deps.get_db),
    current_user: models.User = Depends(deps.get_current_active_user),
) -> Any:
    """
    Retrieve a warehouse among mine.
    """
    warehouse = crud.warehouse.get(db= db, id= warehouse_id)
    if not warehouse:
        raise HTTPException(
            status_code=400,
            detail="Magasin inexistant",
        )
    return warehouse

@router.patch("/{warehouse_id}", response_model=schemas.WarehouseRetrieve)
def update(
    warehouse_id: int,
    warehouse_in: schemas.WarehouseUpdate,
    db: Session = Depends(deps.get_db),
    current_manager: models.User = Depends(deps.get_current_active_store_manager),
) -> Any:
    """
    Update a warehouse informations. 
    Only the managers affiliated to the warehouse can perform that.
    """
    warehouse = crud.warehouse.get(db= db, id= warehouse_id)
    if not warehouse:
        raise HTTPException(
            status_code=400,
            detail="Magasin inexistant",
        )
    if not crud.warehouse.is_user_manager_of(db= db, warehouse= warehouse, user = current_manager) :
        raise HTTPException(
            status_code=400,
            detail="Vous n'êtes pas habilité à modifier les informations dans magasin",
        )
    return crud.warehouse.update(db, db_obj= warehouse, obj_in= warehouse_in)

@router.delete("/{warehouse_id: int}", response_model=schemas.WarehouseRetrieve)
def delete(
    warehouse_id: int,
    db: Session = Depends(deps.get_db),
    current_manager: models.User = Depends(deps.get_current_active_store_manager),
) -> Any:
    """
    Set a warehouses inactive.
    """
    warehouse = crud.store.get(db, id=warehouse_id)
    if not warehouse:
        raise HTTPException(
            status_code=404,
            detail="Magasin inexistant",
        )
    if not crud.warehouse.is_user_manager_of(db= db, warehouse= warehouse, user = current_manager) :
        raise HTTPException(
            status_code=400,
            detail="Vous n'êtes pas habilité à modifier les informations dans magasin",
        )
    deleted_warehouse = crud.store.delete(db, id= warehouse_id)
    return deleted_warehouse