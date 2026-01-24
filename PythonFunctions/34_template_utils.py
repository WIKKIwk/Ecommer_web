"""Template utilities"""
from string import Template


def render_template(template_str: str, **kwargs) -> str:
    """Render template with variables"""
    template = Template(template_str)
    return template.safe_substitute(**kwargs)


def render_file_template(template_path: str, **kwargs) -> str:
    """Render template from file"""
    with open(template_path, 'r') as f:
        template_str = f.read()
    return render_template(template_str, **kwargs)
