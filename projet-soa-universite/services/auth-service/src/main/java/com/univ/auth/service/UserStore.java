package com.univ.auth.service;

import org.bson.Document;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Component;

import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoClients;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;
import static com.mongodb.client.model.Filters.eq;
import com.mongodb.client.model.IndexOptions;
import static com.mongodb.client.model.Indexes.ascending;

import jakarta.annotation.PostConstruct;
import jakarta.annotation.PreDestroy;

@Component
public class UserStore implements UserRepository {

    private static final Logger logger = LoggerFactory.getLogger(UserStore.class);

    private MongoClient mongoClient;
    private String mongoDb;
    private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    @PostConstruct
    public void init() {
        String mongoUri = System.getenv().getOrDefault("MONGODB_URI", "mongodb://localhost:27017/");
        this.mongoDb = System.getenv().getOrDefault("MONGODB_DATABASE", "mydb");
        this.mongoClient = MongoClients.create(mongoUri);
        try {
            MongoCollection<Document> coll = mongoClient.getDatabase(this.mongoDb).getCollection("users");
            coll.createIndex(ascending("username"), new IndexOptions().unique(true));
            logger.info("Ensured unique index on users.username");
        } catch (Exception e) {
            logger.warn("Could not create unique index on users.username: {}", e.getMessage());
        }
        logger.info("Initialized MongoDB client (uri={}, db={})", mongoUri, this.mongoDb);
    }

    @PreDestroy
    public void close() {
        if (this.mongoClient != null) {
            this.mongoClient.close();
            logger.info("Closed MongoDB client");
        }
    }
    @Override
    public boolean isValid(String username, String password) {
        if (username == null || password == null) return false;
        if (this.mongoClient == null) {
            logger.error("MongoClient not initialized when validating user {}", username);
            return false;
        }
        try {
            MongoDatabase db = mongoClient.getDatabase(mongoDb);
            MongoCollection<Document> coll = db.getCollection("users");
            Document doc = coll.find(eq("username", username)).first();
            if (doc == null) {
                return false;
            }
            String stored = doc.getString("password");
            return stored != null && passwordEncoder.matches(password, stored);
        } catch (Exception e) {
            logger.error("Error validating user {}", username, e);
            return false;
        }
    }

    @Override
    public boolean registerUser(String name, String prename, String username, String section, String phone, String email, String password, String role, String sector) {
        if (username == null || password == null) return false;
        try {
            MongoDatabase db = mongoClient.getDatabase(mongoDb);
            MongoCollection<Document> coll = db.getCollection("users");
            Document existing = coll.find(eq("username", username)).first();
            if (existing != null) {
                return false; // username already exists
            }
            String hashed = passwordEncoder.encode(password);
            Document doc = new Document("username", username)
                    .append("password", hashed)
                    .append("name", name)
                    .append("prename", prename)
                    .append("section", section)
                    .append("phone", phone)
                    .append("email", email)
                    .append("role", role)
                    .append("sector", sector);
            coll.insertOne(doc);
            return true;
        } catch (Exception e) {
            logger.error("Error registering user {}", username, e);
            return false;
        }
    }
}