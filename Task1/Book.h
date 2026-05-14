#ifndef BOOK_H
#define BOOK_H

#include <iostream>
#include <string>

class Book {
public:
    int id;
    std::string title;
    double price;

    Book(int i, std::string t, double p);

    bool operator==(const Book& other) const;
    bool operator>(const Book& other) const;

    friend std::ostream& operator<<(std::ostream& out, const Book& b);
    friend std::istream& operator>>(std::istream& in, Book& b);
};

#endif