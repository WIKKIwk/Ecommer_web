"""Observer pattern utilities"""


class Subject:
    """Subject in observer pattern"""
    def __init__(self):
        self._observers = []
    
    def attach(self, observer):
        """Attach observer"""
        if observer not in self._observers:
            self._observers.append(observer)
    
    def detach(self, observer):
        """Detach observer"""
        self._observers.remove(observer)
    
    def notify(self, *args, **kwargs):
        """Notify all observers"""
        for observer in self._observers:
            observer.update(*args, **kwargs)


class Observer:
    """Observer base class"""
    def update(self, *args, **kwargs):
        """Update method to be overridden"""
        pass
