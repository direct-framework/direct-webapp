FROM python:3.12-slim-bookworm

WORKDIR /usr/src/app

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY --chown=nobody:nogroup . .

RUN python manage.py collectstatic --noinput

COPY entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

RUN chown -R nobody:nogroup /usr/src/app \
 && chmod -R +r /usr/src/app

USER nobody

EXPOSE 8000

ENTRYPOINT ["/entrypoint.sh"]
CMD ["gunicorn", "direct_webapp.wsgi:application", "--bind", "0.0.0.0:8000"]
