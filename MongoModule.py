import mongodb

class Database:

    def __init__(self):
        self.ip = 'localhost'
        self.port = 27017
        self.client = MongoClient(ip, port)
        self.db = client['Database Name']

    def getDatabase(self):
        return self.db
