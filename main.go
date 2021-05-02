package main

import (
	"database/sql"
	"encoding/json"
	"log"
	"net/http"

	_ "github.com/lib/pq"

	"fmt"
)

var db *sql.DB

type Product struct {
	Id          int
	Name        string
	Description string
	Price       float64
	Balance     int
	Sale        int
	Category    string
}

type Products struct {
	Products []Product
}

func main() {
	var err error

	db, err = sql.Open("postgres", "host=127.0.0.1 user=postgres dbname=api_shop sslmode=disable")
	if err != nil {
		panic(err)
	}

	defer db.Close()

	fmt.Println("Starting server...")

	http.HandleFunc("/v1/products/add", addProduct)
	http.HandleFunc("/v1/products/", getProducts)
	log.Fatal(http.ListenAndServe(":8080", nil))
}

func getProducts(w http.ResponseWriter, r *http.Request) {
	if r.Method != "GET" {
		http.Error(w, "Method Not Allowed", http.StatusMethodNotAllowed)
	} else {
		w_array := Products{}

		fmt.Println("# Querying for all products...")
		rows, err := db.Query("SELECT id,name,description,price,balance,sale,category from products")
		if err != nil {
			panic(err)
		}

		for rows.Next() {
			w_product := Product{}

			err = rows.Scan(&w_product.Id, &w_product.Name, &w_product.Description,
				&w_product.Price, &w_product.Balance, &w_product.Sale, &w_product.Category)
			if err != nil {
				panic(err)
			}
			w_array.Products = append(w_array.Products, w_product)

		}

		json.NewEncoder(w).Encode(w_array)
	}
}

func addProduct(w http.ResponseWriter, r *http.Request) {
	if r.Method != "POST" {
		http.Error(w, "Method Not Allowed", http.StatusMethodNotAllowed)
	} else {
		decoder := json.NewDecoder(r.Body)
		var g_product Product

		err := decoder.Decode(&g_product)
		if err != nil {
			panic(err)
		}

		query := fmt.Sprintf("INSERT INTO products(name, description, price, balance, sale, category) VALUES('%s', '%s', %f, %d, %d, '%s') RETURNING id",
			g_product.Name, g_product.Description, g_product.Price, g_product.Balance, g_product.Sale, g_product.Category)

		fmt.Printf("# Insert query: %s\n", query)

		rows, err := db.Query(query)
		if err != nil {
			panic(err)
		}

		for rows.Next() {
			var id int
			err = rows.Scan(&id)
			if err != nil {
				panic(err)
			}
			fmt.Fprintf(w, "{\"id\":%d}\n", id)
		}

	}
}
