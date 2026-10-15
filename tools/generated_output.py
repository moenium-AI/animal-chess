"""Replace generated data only after its caller has validated the entire set."""
import os
from pathlib import Path
import tempfile


def atomic_write(path, body):
    destination = Path(path).resolve()
    temporary = None
    try:
        with tempfile.NamedTemporaryFile(mode='w', encoding='utf-8', newline='\n',
                                         dir=destination.parent, delete=False) as stream:
            temporary = Path(stream.name)
            stream.write(body)
            stream.flush()
            os.fsync(stream.fileno())
        os.replace(temporary, destination)
    finally:
        if temporary is not None:
            temporary.unlink(missing_ok=True)
