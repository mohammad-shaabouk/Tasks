#ifndef LIBRARY_H
#define LIBRARY_H

#include <map>
#include <memory>
#include <vector>
#include "Book.h"

class Library {
    std::map<int, std::shared_ptr<Book>> books;

public:
    void addBook(std::shared_ptr<Book> book);
    void removeBook(int id);

    std::vector<std::shared_ptr<Book>> filterByPrice(double minPrice);
    void sortBooks();
    void printAll() const;
};

#endif