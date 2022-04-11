from alembic import op
from sqlalchemy_searchable import sync_trigger, vectorizer


def fullsearch(func) :
    """
    A decorator to set an adhoc full-text search triggers on Answer model
    
    Requirements:
        - Fields to perform search must be migrated 
        - The ts_vectors must also be migrated
        
    Use:
        (Somewhere in an Alembic migration, ensuring requirements are satisfied)
        from somewhere import fullsearch
        
        @fullsearch
        def upgrade():
            ....
            
        @fullsearch
        def downgrade():
            ....
    
    It should be set on both upgrade() and downgrade() Alembic function 
    """
    def wrapper() :
        import sqlalchemy_utils
        import sqlalchemy as sa
        from sqlalchemy.dialects.postgresql import JSON
        
        vectorizer.clear()
        
        @vectorizer(JSON)
        def json_vectorizer(column):
            return sa.cast(column, sa.Text)
        
        # Calling Alembic upgrade()
        func()
        conn = op.get_bind()
        
        
        sync_trigger(
            conn,
            'answer',
            'vs_vector',
            [        
                'value_string_eng', 
                'value_string_fr', 
                'value_string_pt', 
                
                'value_text_eng',
                'value_text_fr',
                'value_text_pt',
                
                'value_tab_eng',
                'value_tab_fr',    
                'value_tab_pt',                

                'value_choices_eng',
                'value_choices_fr',
                'value_choices_pt',
                
                'value_subquestion_eng',
                'value_subquestion_fr',
                'value_subquestion_pt',
                
                'value_list_eng',
                'value_list_fr',
                'value_list_pt',

                'country_name_eng',
                'country_name_fr',
                'country_name_pt'
            ]
        )
    return wrapper