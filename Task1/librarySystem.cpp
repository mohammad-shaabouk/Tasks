#include <iostream>
#include <vector>
#include <map>
#include <memory>
#include <algorithm>
#include <stdexcept>
#include <cmath>

using namespace std;

// ======================= SHAPE =======================
class Shape {
public:
    virtual double area() const = 0;
    virtual void draw() const = 0;
    virtual ~Shape() {}
};

class Circle : public Shape {
    double radius;
public:
    Circle(double r) : radius(r) {}

    double area() const override {
        return M_PI * radius * radius;
    }

    void draw() const override {
        cout << "Drawing Circle\n";
    }
};

class Rectangle : public Shape {
    double width, height;
public:
    Rectangle(double w, double h) : width(w), height(h) {}

    double area() const override {
        return width * height;
    }

    void draw() const override {
        cout << "Drawing Rectangle\n";
    }
};

// ======================= STACK TEMPLATE =======================
template <typename T>
class Stack {
    vector<T> data;

public:
    void push(const T& value) {
        data.push_back(value);
    }

    void pop() {
        if (data.empty())
            throw runtime_error("Stack is empty");
        data.pop_back();
    }

    T top() const {
        if (data.empty())
            throw runtime_error("Stack is empty");
        return data.back();
    }

    bool empty() const {
        return data.empty();
    }
};

// ======================= BOOK =======================
class Book {
public:
    int id;
    string title;
    double price;

    Book(int i = 0, string t = "", double p = 0.0)
        : id(i), title(t), price(p) {}

    bool operator==(const Book& other) const {
        return id == other.id;
    }

    bool operator>(const Book& other) const {
        return price > other.price;
    }

    friend ostream& operator<<(ostream& out, const Book& b) {
        out << "ID: " << b.id << " Title: " << b.title << " Price: " << b.price;
        return out;
    }

    friend istream& operator>>(istream& in, Book& b) {
        cout << "Enter ID Title Price: ";
        if (!(in >> b.id >> b.title >> b.price)) {
            throw runtime_error("Invalid input");
        }
        return in;
    }
};

// ======================= LIBRARY =======================
class Library {
    map<int, shared_ptr<Book>> books;

public:
    void addBook(shared_ptr<Book> book) {
        books[book->id] = book;
    }

    void removeBook(int id) {
        books.erase(id);
    }

    vector<shared_ptr<Book>> filterByPrice(double minPrice) {
        vector<shared_ptr<Book>> result;

        for (auto& pair : books) {
            if (pair.second->price >= minPrice)
                result.push_back(pair.second);
        }

        return result;
    }

    void sortBooks() {
        vector<shared_ptr<Book>> vec;

        for (auto& p : books)
            vec.push_back(p.second);

        sort(vec.begin(), vec.end(),
             [](auto a, auto b) {
                 return *a > *b;
             });

        for (auto& b : vec)
            cout << *b << endl;
    }

    void printAll() const {
        for (const auto& p : books)
            cout << *p.second << endl;
    }
};

// ======================= MAIN =======================
int main() {
    try {
        // 🔹 Shapes
        unique_ptr<Shape> s1 = make_unique<Circle>(5);
        unique_ptr<Shape> s2 = make_unique<Rectangle>(4, 6);

        cout << "Circle Area: " << s1->area() << endl;
        cout << "Rectangle Area: " << s2->area() << endl;

        // 🔹 Stack
        Stack<int> st;
        st.push(10);
        st.push(20);
        cout << "Top of stack: " << st.top() << endl;

        // 🔹 Library
        Library lib;

        auto b1 = make_shared<Book>(1, "C++", 50);
        auto b2 = make_shared<Book>(2, "Python", 30);
        auto b3 = make_shared<Book>(3, "Java", 40);

        lib.addBook(b1);
        lib.addBook(b2);
        lib.addBook(b3);

        cout << "\nAll Books:\n";
        lib.printAll();

        cout << "\nFiltered (price >= 40):\n";
        auto filtered = lib.filterByPrice(40);
        for (auto& b : filtered)
            cout << *b << endl;

        cout << "\nSorted Books:\n";
        lib.sortBooks();

        // 🔹 Exception test
        Book inputBook;
        cin >> inputBook;

    } catch (const exception& e) {
        cout << "Error: " << e.what() << endl;
    }

    return 0;
}