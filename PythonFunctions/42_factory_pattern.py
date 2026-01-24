"""Factory pattern utilities"""


class AnimalFactory:
    """Factory for creating animals"""
    
    @staticmethod
    def create_animal(animal_type: str):
        """Create animal by type"""
        if animal_type == 'dog':
            return Dog()
        elif animal_type == 'cat':
            return Cat()
        else:
            raise ValueError(f"Unknown animal type: {animal_type}")


class Dog:
    def speak(self):
        return "Woof!"


class Cat:
    def speak(self):
        return "Meow!"


def factory_method(cls_name: str, *args, **kwargs):
    """Generic factory method"""
    import sys
    module = sys.modules[__name__]
    cls = getattr(module, cls_name)
    return cls(*args, **kwargs)
