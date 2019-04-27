# Swagger-codegenのバージョン
SWAGGER_V="2.4.4"

.PHONY: all
all: build

.PHONY: clean
clean:
	rm bin/swagger-codegen-cli.jar

.PHONY: build
build: build-ts

.PHONY: build-ts
build-ts: splathon-api/docs/swagger.yaml install
	mkdir -p ./src/swagger/splathon-api
	java -jar ./bin/swagger-codegen-cli.jar generate -i splathon-api/docs/swagger.yaml -l typescript-fetch -o ./src/swagger/splathon-api --additional-properties modelPropertyNaming=original

.PHONY: install
install: bin/swagger-codegen-cli.jar

bin/swagger-codegen-cli.jar:
	mkdir -p bin
	wget http://central.maven.org/maven2/io/swagger/swagger-codegen-cli/$(SWAGGER_V)/swagger-codegen-cli-$(SWAGGER_V).jar -O bin/swagger-codegen-cli.jar

