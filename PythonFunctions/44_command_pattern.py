"""Command pattern utilities"""


class Command:
    """Base command class"""
    def execute(self):
        """Execute command"""
        raise NotImplementedError
    
    def undo(self):
        """Undo command"""
        raise NotImplementedError


class LightOnCommand(Command):
    """Turn light on command"""
    def __init__(self, light):
        self.light = light
    
    def execute(self):
        self.light.turn_on()
    
    def undo(self):
        self.light.turn_off()


class Light:
    """Light device"""
    def turn_on(self):
        print("Light is ON")
    
    def turn_off(self):
        print("Light is OFF")


class RemoteControl:
    """Remote control invoker"""
    def __init__(self):
        self.command = None
    
    def set_command(self, command: Command):
        """Set command"""
        self.command = command
    
    def press_button(self):
        """Execute command"""
        self.command.execute()
