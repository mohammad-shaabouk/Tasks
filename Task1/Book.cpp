#include "Book.h"

Book::Book(int i, std::string t, double p)
    : id(i), title(t), price(p) {}

bool Book::operator==(const Book& other) const {
    return id == other.id;
}

bool Book::operator>(const Book& other) const {
    return price > other.price;
}

std::ostream& operator<<(std::ostream& out, const Book& b) {
    out << "ID: " << b.id << " Title: " << b.title << " Price: " << b.price;
    return out;
}

std::istream& operator>>(std::istream& in, Book& b) {
    std::cout << "Enter ID Title Price: ";
    if (!(in >> b.id >> b.title >> b.price)) {
        throw std::runtime_error("Invalid input");
    }
    return in;
}