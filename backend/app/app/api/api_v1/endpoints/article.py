from typing import Any, List, Optional
from app.utilsp.uploads import save_upload_file

from fastapi import APIRouter, Body, Depends, HTTPException, UploadFile, File
from fastapi.encoders import jsonable_encoder
from sqlalchemy.orm import Session

from app import crud, models, schemas
from app.api import deps

router = APIRouter()


@router.post("/", response_model=schemas.ArticleRetrieve)
def create(
    *,
    # img: Optional[UploadFile] = File(None),
    db: Session = Depends(deps.get_db),
    article_in: schemas.ArticleCreate,
    manager: models.User = Depends(deps.get_current_active_store_manager),
):
    """
    Create new article.
    """
    # TODO: set user permissions
    # print(img)
    # save_upload_file(img)
    return crud.article.create(db, obj_in = article_in)

@router.get("/all", response_model= schemas.ArticleRead)
def read_all(
    store_id: Optional[int] = None,
    warehouse_id: Optional[int] = None,
    db: Session = Depends(deps.get_db),
    su: models.User = Depends(deps.get_current_active_superuser),
):
    """
    List all articles. SU option
    """
    articles = crud.article.get_all(db= db)
    return schemas.ArticleRead(results= articles, total= len(articles))

@router.get("/many", response_model= schemas.ArticleRead)
def read_many(
    ids: str,
    db: Session = Depends(deps.get_db),
    current_user: models.User = Depends(deps.get_current_active_user),
):
    """
    List many article based on ids
    """
    ids = [ int(i) for i in ids.split(',') if i ]
    articles = crud.article.get_many(db= db, ids= ids)
    return schemas.ArticleRead(results= articles, total= len(articles))

@router.get("/", response_model= schemas.ArticleRead)
def read_mine(
    store_id: Optional[int] = None,
    warehouse_id: Optional[int] = None,
    db: Session = Depends(deps.get_db),
    manager: models.User = Depends(deps.get_current_active_store_manager),
):
    """
    List all articles according to filters
    """
    articles = []
    if store_id :
        store = crud.store.get(db= db, id= store_id)
        if store :
            articles = crud.article.list_per_store(db= db, store= store)
        else :
            raise HTTPException(
                status_code=400,
                detail="Boutique inexistante",
            )
    elif warehouse_id :
        warehouse = crud.warehouse.get(db= db, id= warehouse_id)
        if warehouse:
            articles = crud.article.list_per_warehouse(db= db, warehouse= warehouse)
        else:
            raise HTTPException(
                status_code=400,
                detail="Magasin inexistant",
            )
    else:
        articles = crud.article.list_managed(db= db, manager= manager)
    return schemas.ArticleRead(results= articles, total= len(articles))

@router.get("/{article_id}", response_model=schemas.ArticleRetrieve)
def retrieve(
    article_id: int,
    db: Session = Depends(deps.get_db),
    current_user: models.User = Depends(deps.get_current_active_user),
) -> Any:
    """
    Retrieve an article.
    """
    article = crud.article.get(db= db, id= article_id)
    if not article:
        raise HTTPException(
            status_code=400,
            detail="Article inexistant",
        )
    return article

@router.patch("/{article_id}", response_model=schemas.ArticleRetrieve)
def update(
    article_id: int,
    article_in: schemas.ArticleUpdate,
    db: Session = Depends(deps.get_db),
    current_manager: models.User = Depends(deps.get_current_active_store_manager),
) -> Any:
    """
    Update a an article. 
    Only the managers affiliated to the warehouse can perform that.
    """
    article = crud.article.get(db= db, id= article_id)
    if not article:
        raise HTTPException(
            status_code=400,
            detail="Article inexistant",
        )
    if not crud.warehouse.is_user_manager_of(db= db, warehouse= crud.warehouse.get(db= db, id = article_in.warehouse_id), user = current_manager) :
        raise HTTPException(
            status_code=400,
            detail="Vous n'êtes pas habilité à modifier les informations dans magasin",
        )
    return crud.article.update(db, db_obj= article, obj_in= article_in)

@router.post('/upload/{article_id}')
def upload_file(
    article_id: int,
    file: Optional[UploadFile] = File(None),
    db: Session=Depends(deps.get_db)
    )->Any:

    article = crud.article.get(db= db, id= int(article_id))
    path = save_upload_file(file)
    filename = str(path).split('/')[-1]
    article.img =filename
    db.add(article)
    db.commit()
    return True


@router.delete("/{article_id}", response_model=schemas.ArticleRetrieve)
def delete(
    article_id: int,
    db: Session = Depends(deps.get_db),
    current_manager: models.User = Depends(deps.get_current_active_store_manager),
) -> Any:
    """
    Set a warehouses inactive.
    """
    article = crud.article.get(db= db, id= article_id)
    if not article:
        raise HTTPException(
            status_code=400,
            detail="Article inexistant",
        )
    if not crud.warehouse.is_user_manager_of(db= db, warehouse= crud.warehouse.get(db= db, id = article.warehouse_id), user = current_manager) :
        raise HTTPException(
            status_code=400,
            detail="Vous n'êtes pas habilité à modifier les informations dans magasin",
        )
    deleted_article = crud.article.delete(db, id= article_id)
    return deleted_article