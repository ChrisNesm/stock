from typing import Any, List

from fastapi import APIRouter, Body, Depends, HTTPException
from fastapi.encoders import jsonable_encoder
from sqlalchemy.orm import Session

from app import crud, models, schemas
from app.api import deps

router = APIRouter()


@router.post("/", response_model=schemas.StoresRetrieve)
def create(
    *,
    db: Session = Depends(deps.get_db),
    store_in: schemas.StoreCreate,
    current_user: models.User = Depends(deps.get_current_active_user),
):
    """
    Create new store.
    """
    existing_store = crud.store.get_identic(db= db, name= store_in.name, owner= current_user.id)
    if existing_store :
        raise HTTPException(
            status_code=400,
            detail="Ce nom de boutique existe déjà",
        )
        
    return crud.store.create(db, obj_in = store_in, owner= current_user)


@router.get("/all", response_model= schemas.store.StoresRead )
def read_all(
    db: Session = Depends(deps.get_db),
    su: models.User = Depends(deps.get_current_active_superuser),
):
    """
    List all stores. SU option
    """
    stores = crud.store.get_all(db= db)
    return schemas.store.StoresRead(results= stores, total= len(stores))

@router.get("/", response_model= schemas.store.StoresRead )
def read_mine(
    db: Session = Depends(deps.get_db),
    current_user: models.User = Depends(deps.get_current_active_user),
):
    """
    List my stores.
    """
    stores = crud.store.list_mine(db= db, owner= current_user)
    return schemas.store.StoresRead(results= stores, total= len(stores))

@router.get("/managed", response_model= schemas.store.StoresRead )
def read_managed(
    db: Session = Depends(deps.get_db),
    current_manager: models.User = Depends(deps.get_current_active_store_manager),
):
    """
    List all stores in which I am manager.
    """
    stores = crud.store.list_managed(db= db, manager= current_manager)
    return schemas.store.StoresRead(results= stores, total= len(stores))

@router.get("/invite-manager", response_model= schemas.store.StoresRead )
def invite_manager(
    db: Session = Depends(deps.get_db),
    current_manager: models.User = Depends(deps.get_current_active_store_manager),
):
    """
    List all stores in which I am manager.
    """
    stores = crud.store.list_managed(db= db, manager= current_manager)
    return schemas.store.StoresRead(results= stores, total= len(stores))

@router.get("/{store_id}", response_model=schemas.StoresRetrieve)
def retrieve(
    store_id: int,
    db: Session = Depends(deps.get_db),
    current_user: models.User = Depends(deps.get_current_active_user),
) -> Any:
    """
    Retrieve a store among mine.
    """
    store = crud.store.get(db= db, id= store_id)
    if not store:
        raise HTTPException(
            status_code=400,
            detail="boutique inexistant",
        )
    return store

@router.patch("/{store_id}", response_model=schemas.StoresRetrieve)
def update(
    store_id: int,
    store_in: schemas.StoreUpdate,
    db: Session = Depends(deps.get_db),
    current_user: models.User = Depends(deps.get_current_active_user),
) -> Any:
    """
    Update a store informations. 
    Only the owner can perform that.
    """
    store = crud.store.get(db= db, id= store_id)
    if not store:
        raise HTTPException(
            status_code=400,
            detail="boutique inexistant",
        )
    if store.owner != current_user.id :
        raise HTTPException(
            status_code=400,
            detail="Seul le propriétaire peut modifier les informations propres au boutique",
        )
    return crud.store.update(db, db_obj= store, obj_in= store_in)

@router.delete("/{store_id}", response_model=schemas.User)
def delete(
    store_id: int,
    db: Session = Depends(deps.get_db),
    current_user: models.User = Depends(deps.get_current_active_superuser),
) -> Any:
    """
    Delete a store.
    """
    store = crud.store.get(db, id=store_id)
    if not store:
        raise HTTPException(
            status_code=404,
            detail="boutique inexistant",
        )
    if store.owner != current_user.id :
        raise HTTPException(
            status_code=400,
            detail="Seul le propriétaire peut supprimer son boutique de la plateforme",
        )
    deleted_store = crud.store.delete(db, id= store_id)
    return deleted_store