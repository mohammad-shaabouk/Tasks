#ifndef SHAPE_H
#define SHAPE_H

#include <iostream>
#include <memory>

class Shape {
public:
    virtual double area() const = 0;
    virtual void draw() const = 0;
    virtual ~Shape() {}
};

class Circle : public Shape {
    double radius;
public:
    Circle(double r);
    double area() const override;
    void draw() const override;
};

class Rectangle : public Shape {
    double width, height;
public:
    Rectangle(double w, double h);
    double area() const override;
    void draw() const override;
};

#endif