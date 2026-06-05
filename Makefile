# Copyright (c) Datalayer, Inc. https://datalayer.io
# Distributed under the terms of the MIT License.

SHELL=/bin/bash

.PHONY: help

default: help ## default target is help

all: clean install build

help: ## display this help
	@awk 'BEGIN {FS = ":.*##"; printf "\nUsage:\n  make \033[36m<target>\033[0m\n"} /^[a-zA-Z_-]+:.*?##/ { printf "  \033[36m%-15s\033[0m %s\n", $$1, $$2 } /^##@/ { printf "\n\033[1m%s\033[0m\n", substr($$0, 5) } ' $(MAKEFILE_LIST)

clean: ## clean
	npm run clean

build: ## build all modules
	npm run build

build-lib: ## build lib
	npm run build:lib

start: ## start
	npm run start

dev: ## dev
	npm run dev

deploy: build ## deploy to web
	aws s3 cp \
		./dist \
		s3://datalayer-design/ \
		--recursive \
		--profile datalayer && \
	aws cloudfront create-invalidation \
		--distribution-id E303GZGZVTY01Q \
		--paths "/*" \
		--profile datalayer && \
	echo open ✨  https://datalayer.design

publish-npm: clean build-lib ## publish-npm
	npm publish --access public
	echo open https://www.npmjs.com/package/@datalayer/design
