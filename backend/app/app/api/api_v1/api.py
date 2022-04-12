from fastapi import APIRouter

from app.api.api_v1.endpoints import auth, users, store, warehouse

api_router = APIRouter()
api_router.include_router(auth.router,prefix="/auth", tags=["auth"])
api_router.include_router(users.router, prefix="/users", tags=["users"])
api_router.include_router(store.router, prefix="/store", tags=["store"])
api_router.include_router(warehouse.router, prefix="/warehouse", tags=["warehouse"])