import psycopg2

try:
    conn = psycopg2.connect(
        host="127.0.0.1",       # or use 'host.docker.internal' if localhost doesn't work
        port=5432,
        database="mydatabase",
        user="root",
        password="root"
    )
    cur = conn.cursor()
    cur.execute("SELECT * from users;")
    result = cur.fetchone()
    print("✅ Connected to DB. Time is:", result[0])
    cur.close()
    conn.close()
except Exception as e:
    print("❌ Connection failed:", e)