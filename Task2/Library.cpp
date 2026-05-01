#include "Library.h"
#include <algorithm>
#include <iostream>

void Library::addBook(std::shared_ptr<Book> book) {
    books[book->id] = book;
}

void Library::removeBook(int id) {
    books.erase(id);
}

std::vector<std::shared_ptr<Book>> Library::filterByPrice(double minPrice) {
    std::vector<std::shared_ptr<Book>> result;

    for (auto& pair : books) {
        if (pair.second->price >= minPrice)
            result.push_back(pair.second);
    }

    return result;
}

void Library::sortBooks() {
    std::vector<std::shared_ptr<Book>> vec;

    for (auto& p : books)
        vec.push_back(p.second);

    std::sort(vec.begin(), vec.end(),
        [](auto a, auto b) {
            return *a > *b;
        });

    for (auto& b : vec)
        std::cout << *b << std::endl;
}

void Library::printAll() const {
    for (const auto& p : books)
        std::cout << *p.second << std::endl;
}