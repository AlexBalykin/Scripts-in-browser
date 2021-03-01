install: install-deps

install-deps:
	npm ci

lint:
	npx eslint .

build:
	rm -rf dist && NODE_ENV=production npx webpack

serv:
	npx webpack serve
	
push:
	git push -u origin main