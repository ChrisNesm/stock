"""business providers moved from Store to Warehouses

Revision ID: e39432f4996a
Revises: 1ae24c2e8e12
Create Date: 2022-04-20 22:12:17.184736

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'e39432f4996a'
down_revision = '1ae24c2e8e12'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('user__store__partnership', sa.Column('warehouse_id', sa.Integer(), nullable=False))
    op.drop_constraint('user__store__partnership_store_id_fkey', 'user__store__partnership', type_='foreignkey')
    op.create_foreign_key(None, 'user__store__partnership', 'warehouse', ['warehouse_id'], ['id'])
    op.drop_column('user__store__partnership', 'store_id')
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('user__store__partnership', sa.Column('store_id', sa.INTEGER(), autoincrement=False, nullable=False))
    op.drop_constraint(None, 'user__store__partnership', type_='foreignkey')
    op.create_foreign_key('user__store__partnership_store_id_fkey', 'user__store__partnership', 'store', ['store_id'], ['id'])
    op.drop_column('user__store__partnership', 'warehouse_id')
    # ### end Alembic commands ###