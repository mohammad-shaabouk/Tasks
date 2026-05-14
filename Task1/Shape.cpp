#include "Shape.h"
#include <cmath>

Circle::Circle(double r) : radius(r) {}

double Circle::area() const {
    return M_PI * radius * radius;
}

void Circle::draw() const {
    std::cout << "Drawing Circle\n";
}

Rectangle::Rectangle(double w, double h) : width(w), height(h) {}

double Rectangle::area() const {
    return width * height;
}

void Rectangle::draw() const {
    std::cout << "Drawing Rectangle\n";
}