"""State machine utilities"""


class StateMachine:
    """Simple state machine"""
    def __init__(self, initial_state: str):
        self.state = initial_state
        self.transitions = {}
        self.handlers = {}
    
    def add_transition(self, from_state: str, to_state: str, event: str):
        """Add state transition"""
        key = (from_state, event)
        self.transitions[key] = to_state
    
    def add_handler(self, state: str, handler):
        """Add state entry handler"""
        self.handlers[state] = handler
    
    def trigger(self, event: str) -> bool:
        """Trigger event"""
        key = (self.state, event)
        if key in self.transitions:
            old_state = self.state
            self.state = self.transitions[key]
            
            # Call handler for new state
            if self.state in self.handlers:
                self.handlers[self.state](old_state, self.state)
            
            return True
        return False
    
    def current_state(self) -> str:
        """Get current state"""
        return self.state
