"""IP address utilities"""
import socket
import ipaddress


def is_valid_ip(ip: str) -> bool:
    """Check if IP is valid"""
    try:
        ipaddress.ip_address(ip)
        return True
    except ValueError:
        return False


def is_private_ip(ip: str) -> bool:
    """Check if IP is private"""
    try:
        return ipaddress.ip_address(ip).is_private
    except ValueError:
        return False


def get_ip_version(ip: str) -> int:
    """Get IP version (4 or 6)"""
    try:
        addr = ipaddress.ip_address(ip)
        return addr.version
    except ValueError:
        return 0


def hostname_to_ip(hostname: str) -> str:
    """Resolve hostname to IP"""
    try:
        return socket.gethostbyname(hostname)
    except socket.gaierror:
        return None
