import binascii
import os
from random import randint


def generate_str_code(length: int = 10) -> str:
    """Generate random string code."""
    return binascii.hexlify(os.urandom(length)).decode()
