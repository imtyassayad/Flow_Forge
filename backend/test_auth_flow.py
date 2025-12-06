
import requests
import json

try:
    # Try to login with admin/admin (or guest/guestpassword if created before)
    # We'll try to guess a user or register one.
    # First, let's try to just hit the projects endpoint to see 401
    print("Checking unauth access to projects...")
    res = requests.get('http://localhost:8000/api/projects/')
    print(f"Status: {res.status_code}")
    
    # Now try to register or login
    username = "testuser_" + "123"
    password = "ComplexPassword!@#123"
    email = f"{username}@example.com"
    
    print(f"\nAttempting registration for {username}...")
    reg_data = {
        "username": username,
        "email": email,
        "password": password,
        "company_name": "Test Company"
    }
    res = requests.post('http://localhost:8000/api/auth/registration/', json=reg_data)
    print(f"Reg Status: {res.status_code}")
    print(f"Reg Response: {res.text}")
    
    token = None
    if res.status_code == 201:
        data = res.json()
        token = data.get('access_token') or data.get('key') or data.get('access')
        print(f"Got token from reg: {token}")

    if not token:
        print("\nAttempting login...")
        login_data = {
            "username": username,
            "password": password
        }
        res = requests.post('http://localhost:8000/api/auth/login/', json=login_data)
        print(f"Login Status: {res.status_code}")
        print(f"Login Response: {res.text}")
        if res.status_code == 200:
            data = res.json()
            token = data.get('access_token') or data.get('key') or data.get('access')
            print(f"Got token from login: {token}")

    if token:
        print(f"\nAccessing projects with token...")
        headers = {'Authorization': f'Bearer {token}'}
        res = requests.get('http://localhost:8000/api/projects/', headers=headers)
        print(f"Auth Project Status: {res.status_code}")
        print(f"Auth Project Response: {res.text}")
    else:
        print("Failed to get token.")

except Exception as e:
    print(e)
