FROM python:3.12-slim-bookworm

ADD requirements.txt /
RUN pip install -r /requirements.txt
EXPOSE 8000
COPY --chown=nobody:nogroup . /usr/src/app
WORKDIR /usr/src/app

RUN chown -R nobody:nogroup /usr/src/app \
 && chmod -R +r /usr/src/app

USER nobody
