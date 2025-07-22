# syntax=docker/dockerfile:1

FROM python:3.11-slim as base

# Prevent .pyc files and buffer output
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

# Set work directory
WORKDIR /app

# Create a non-root user with no home directory or shell access
ARG UID=10001
RUN adduser \
    --disabled-password \
    --gecos "" \
    --home "/nonexistent" \
    --shell "/usr/sbin/nologin" \
    --uid "${UID}" \
    appuser

# Copy and install dependencies
COPY requirements.txt .
RUN pip install --upgrade pip && pip install --no-cache-dir -r requirements.txt

# Copy the entire app source code
COPY . .


# Ensure permissions belong to the non-root user
RUN chown -R appuser /app

# Switch to non-root user
USER appuser

# Expose port
EXPOSE 8000

# Start server
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]
