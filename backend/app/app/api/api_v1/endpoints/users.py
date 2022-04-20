from typing import Any, List

from fastapi import APIRouter, Body, Depends, HTTPException
from fastapi.encoders import jsonable_encoder
from pydantic.networks import EmailStr
from sqlalchemy.orm import Session

from app import crud, models, schemas
from app.api import deps
from app.core.config import settings
from app.utils import send_new_account_email

router = APIRouter()

@router.get("/", response_model= schemas.user.UsersList )
def read_users(
    db: Session = Depends(deps.get_db),
    skip: int = 0,
    limit: int = 100,
    current_user: models.User = Depends(deps.get_current_active_user),
) -> Any:
    """
    Retrieve users.
    """
    users = crud.user.get_multi(db, skip=skip, limit=limit)
    return schemas.user.UsersList(results= users, total= len(users))

@router.post("/", response_model=schemas.User)
def create_user(
    *,
    db: Session = Depends(deps.get_db),
    user_in: schemas.UserCreate,
    current_user: models.User = Depends(deps.get_current_active_superuser),
) -> Any:
    """
    Create new user.
    """
    user = crud.user.get_by_email(db, email=user_in.email)
    if user:
        raise HTTPException(
            status_code=400,
            detail="The user with this username already exists in the system.",
        )
    user = crud.user.create(db, obj_in=user_in)
    if settings.EMAILS_ENABLED and user_in.email:
        send_new_account_email(
            email_to=user_in.email, username=user_in.email, password=user_in.password
        )
    return user

@router.get("/me", response_model=schemas.User)
def read_user_me(
    db: Session = Depends(deps.get_db),
    current_user: models.User = Depends(deps.get_current_active_user),
) -> Any:
    """
    Get current user.
    """
    return current_user


@router.patch("/me", response_model=schemas.User)
def update_user_me(
    *,
    db: Session = Depends(deps.get_db),
    password: str = Body(None),
    full_name: str = Body(None),
    email: str = Body(None),
    current_user: models.User = Depends(deps.get_current_active_user),
) -> Any:
    """
    Update own user.
    """
    current_user_data = jsonable_encoder(current_user)
    user_in = schemas.UserUpdate(**current_user_data)
    if password is not None:
        user_in.password = password
    if full_name is not None:
        user_in.full_name = full_name
    if email is not None:
        user_in.email = email

    user = crud.user.update(db, db_obj=current_user, obj_in=user_in)
    return user

@router.get("/all", response_model= schemas.UsersList)
def read_all(
    db: Session = Depends(deps.get_db),
    seller: models.User = Depends(deps.get_current_active_superuser),
):
    """
    List all orders. SU option
    """
    orders = crud.user.get_all(db= db)
    return schemas.UsersList(results= orders, total= len(orders))


@router.get("/many", response_model= schemas.UsersList)
def read_many(
    ids: str,
    db: Session = Depends(deps.get_db),
    current_user: models.User = Depends(deps.get_current_active_user),
):
    """
    List many article based on ids
    """
    ids = [ int(i) for i in ids.split(',') if i ]
    articles = crud.order.get_many(db= db, ids= ids)
    return schemas.UsersList(results= articles, total= len(articles))


@router.get("/{user_id}", response_model=schemas.User)
def read_user_me(
    user_id: int,
    db: Session = Depends(deps.get_db),
    current_user: models.User = Depends(deps.get_current_active_superuser),
) -> Any:
    """
    Get current user.
    """
    return crud.user.get(db= db, id= user_id)


@router.patch("/{user_id}", response_model=schemas.User)
def update_user(
    *,
    db: Session = Depends(deps.get_db),
    user_id: int,
    user_in: schemas.UserUpdate,
    current_user: models.User = Depends(deps.get_current_active_superuser),
) -> Any:
    """
    Update a user.
    """
    user = crud.user.get(db, id=user_id)
    print(user_in)
    if not user:
        raise HTTPException(
            status_code=404,
            detail="The user with this username does not exist in the system",
        )
    if user.id == current_user.id :
        if user_in.is_manager or user_in.is_seller or user_in.is_owner :
            raise HTTPException(
            status_code=404,
            detail="An admin cannot become neither manager nor seller",
        )
    user = crud.user.update(db, db_obj=user, obj_in=user_in)
    return user


@router.delete("/{user_id}", response_model=schemas.User)
def delete_user(
    user_id: int,
    db: Session = Depends(deps.get_db),
    current_user: models.User = Depends(deps.get_current_active_superuser),
) -> Any:
    """
    Delete a user.
    """
    user = crud.user.get(db, id=user_id)
    if not user:
        raise HTTPException(
            status_code=404,
            detail="The user with this username does not exist in the system",
        )
    user = crud.user.delete(db, id= user_id)
    return user


@router.patch("/change-password", response_model=schemas.User)
def change_my_password(
    *,
    current_password: str = Body(...),
    new_password: str = Body(...),
    db: Session = Depends(deps.get_db),
    current_user: models.User = Depends(deps.get_current_active_user),
) -> Any:
    """
    Update own user.
    """
    current_user_data = jsonable_encoder(current_user)
    if not ( current_password and new_password) :
        raise HTTPException(
            status_code=401,
            detail="Current password and new one are required",
        )
    user_in = schemas.UserUpdate(**current_user_data, password= new_password)
    user = crud.user.update(db, db_obj=current_user, obj_in=user_in)
    return user

