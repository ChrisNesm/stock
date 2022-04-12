from typing import List, Optional

from pydantic import BaseModel, EmailStr


# Shared properties
class UserBase(BaseModel):
    email: Optional[str] = None
    is_active: Optional[bool] = True
    is_superuser: bool = False
    is_owner: bool = False
    is_manager: bool = False
    is_seller: bool = False
    full_name: Optional[str] = None

# Properties to receive via API on creation
class UserCreate(UserBase):
    email: str
    password: str

# Properties to receive via API on creation
class EmailCheck(BaseModel):
    email: str


# Properties to receive via API on update
class UserUpdate(UserBase):
    password: Optional[str] = None


class UserInDBBase(UserBase):
    id: Optional[int] = None

    class Config:
        orm_mode = True


# Additional properties to return via API
class User(UserInDBBase):
    pass


# Additional properties stored in DB
class UserInDB(UserInDBBase):
    hashed_password: str

class UsersList(BaseModel):
    results: List[User]
    total: int