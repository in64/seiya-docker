#!/bin/sh

set -ex

case "$1" in
  https://*)
    url="$1"
    shift
    curl -fsSL "$url" | sh -s -- "$@"
    ;;
  *)
    "$@"
    ;;
esac


exec /usr/bin/supervisord -n -u 0 -c /etc/supervisor/supervisord.conf