#!/bin/zsh
set -u

WORKDIR="/Users/huangxianfeng/Documents/Codex/2026-05-19/new-chat"
NODE="/Users/huangxianfeng/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node"
LOG="$WORKDIR/logs/daily-update.log"

mkdir -p "$WORKDIR/logs"
{
  echo "===== $(date '+%Y-%m-%d %H:%M:%S %Z') daily update start ====="
  cd "$WORKDIR" || exit 1
  "$NODE" tools/update-daily-data.mjs
  exit_code=$?
  echo "===== $(date '+%Y-%m-%d %H:%M:%S %Z') daily update exit: $exit_code ====="
  exit "$exit_code"
} >> "$LOG" 2>&1
