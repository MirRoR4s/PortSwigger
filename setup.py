#!/usr/bin/env python
import ast
import os
import re
from io import open

from setuptools import find_packages, setup

setup_dir = os.path.abspath(os.path.dirname(__file__))


extra_requirements = {
    "dev": [
        "black",
        "tox",
        "flake8",
        "check-manifest",
        "mock",
        "pytest",
        "pytest-bdd",
        "pytest-cov",
        "netifaces",
        "ipaddress",
        "wheel",
    ],
    "docs": ["sphinx", "sphinx_rtd_theme", "pygments>=2.4.0","myst-parser"],
}
extra_requirements["dev"] += extra_requirements["docs"]

setup(
    name="PortSwigger",
    version="0.1.0",
    description="My PortSwigger's Study Record",
    long_description_content_type="text/x-rst",
    maintainer="MirROR4s",
    maintainer_email="mirror4s@birkenwald.cn",
    url="https://github.com/MirRoR4s/PortSwigger.git",
    packages=find_packages(exclude=["docs"]),
    install_requires=[
        "attrs",
        "click",
        "colorama",
        "Flask",
        "funcy",
        "future",
        "psutil",
        "pyserial",
        "pydot",
        "six",
        "tornado",
    ],
    extras_require=extra_requirements,
    python_requires=">=3.6",
    classifiers=[
        "Development Status :: 4 - Beta",
        "Environment :: Console",
        "Environment :: Console :: Curses",
        "Intended Audience :: Developers",
        "Intended Audience :: Science/Research",
        "License :: OSI Approved :: GNU General Public License v2 (GPLv2)",
        "Natural Language :: English",
        "Operating System :: OS Independent",
        "Programming Language :: Python",
        "Programming Language :: Python :: 3",
        "Programming Language :: Python :: 3.6",
        "Programming Language :: Python :: 3.7",
        "Programming Language :: Python :: 3.8",
        "Programming Language :: Python :: 3.9",
        "Programming Language :: Python :: 3.10",
        "Topic :: Security",
        "Topic :: System :: Networking",
        "Topic :: Software Development :: Testing :: Traffic Generation",
    ],
)