"""YAML utilities"""
try:
    import yaml
except ImportError:
    yaml = None


def read_yaml(filepath: str) -> dict:
    """Read YAML file"""
    if yaml is None:
        raise ImportError("PyYAML not installed")
    with open(filepath, 'r') as f:
        return yaml.safe_load(f)


def write_yaml(data: dict, filepath: str):
    """Write YAML file"""
    if yaml is None:
        raise ImportError("PyYAML not installed")
    with open(filepath, 'w') as f:
        yaml.dump(data, f, default_flow_style=False)


def yaml_to_json(yaml_str: str) -> str:
    """Convert YAML to JSON"""
    import json
    if yaml is None:
        raise ImportError("PyYAML not installed")
    data = yaml.safe_load(yaml_str)
    return json.dumps(data, indent=2)
