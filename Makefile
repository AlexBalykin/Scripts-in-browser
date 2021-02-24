install: install-deps

install-deps:
	npm ci

lint:
	npx eslint .

build:
	NODE_ENV='production' npx webpack

start:
	npx webpack serve
	
push:
	git push -u origin main