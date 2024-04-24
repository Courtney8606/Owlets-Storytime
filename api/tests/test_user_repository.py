from lib.user_repository import UserRepository
from lib.user import User

def test_get_all_users(db_connection):
    db_connection.seed("seeds/bookclub.sql")
    repository = UserRepository(db_connection)
    assert repository.find_all() == [
        {'id': 1, 'username': 'mrs_dursley', 'email': 'dursley@gmail.com', 'password': 'hatemynephew123', 'child': None, 'role': 'parent', 'connections': None},
        {'id':2,'username': 'montoya','email': 'montoya@gmail.com','password': 'preapre2die', 'child': None, 'role': 'parent', 'connections': None },
        {'id': 3, 'username': 'remy', 'email': 'remy@gmail.com', 'password': 'kissthecook', 'child': None, 'role': 'parent', 'connections': None}
    ]

def test_get_single_users(db_connection):
    db_connection.seed("seeds/bookclub.sql")
    repository = UserRepository(db_connection)
    assert repository.find_id(2) == {'id':2,'username': 'montoya','email': 'montoya@gmail.com','password': 'preapre2die', 'child': None, 'role': 'parent', 'connections': None }
    

def test_create_users(db_connection):
    db_connection.seed("seeds/bookclub.sql")
    repository = UserRepository(db_connection)
    user = User(None, 'mustafa', 'mustafa@my.com', 'topsecret', None, None, None)
    repository.create(user)
    assert repository.find_id(4) == {'id':4,'username': 'mustafa','email': 'mustafa@my.com','password': 'topsecret', 'child': None, 'role': 'parent', 'connections': None }
    

