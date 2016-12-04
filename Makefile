.PHONY: all deploy

all:
	npm install
	./node_modules/.bin/gulp

deploy:
	rm -r ./dist
	cp -r ./src ./dist
	./node_modules/.bin/gulp deploy
