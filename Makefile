install: install-deps

install-deps:
	npm ci

lint:
	npx eslint .

test:
	npx jest

test-coverage:
	npx jest coverage	

build:
	NODE_ENV=production npx webpack

serv:
	npx webpack serve --mode development
	
push:
	git push -u origin main