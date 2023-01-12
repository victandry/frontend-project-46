### Hexlet tests and linter status:
[![Actions Status](https://github.com/victandry/frontend-project-46/workflows/hexlet-check/badge.svg)](https://github.com/victandry/frontend-project-46/actions)
<a href="https://codeclimate.com/github/victandry/frontend-project-46/maintainability"><img src="https://api.codeclimate.com/v1/badges/12feeff99dd32e16efa1/maintainability" /></a>
<a href="https://codeclimate.com/github/victandry/frontend-project-46/test_coverage"><img src="https://api.codeclimate.com/v1/badges/12feeff99dd32e16efa1/test_coverage" /></a>

### Описание

Gendiff - утилита, позволяющая вывести разницу между двумя файлами в удобном формате.
Например, с помощью gendiff удобно отслеживать вносящиеся в файл изменения.

### Минимальные требования
Node.js версия 13.2.0 и выше

### Инструкция по установке
```
make install
```

### Инструкция по запуску
1. Для того, чтобы вывести справку по использованию команды
```
gendiff -h
```
2. Gendiff можно использовать как с относительными, так и с абсолютными путями до сравниваемых файлов:
```
gendiff home/victandry/frontend-project-46/__fixtures__/file3.json __fixtures__/file4.json
```
[![asciicast](https://asciinema.org/a/d32fQOo5PSmpIf2GCMnErJSK4.svg)](https://asciinema.org/a/d32fQOo5PSmpIf2GCMnErJSK4)

3. Gendiff может сравнивать файлы формата .json и .yml.
Если не указан формат файла, то он по умолчанию воспринимается как .json.
```
gendiff /__fixtures__/file3 __fixtures__/file4.yml
```
[![asciicast](https://asciinema.org/a/hZi2gX2k8vtK3ULU6SfrSZOjH.svg)](https://asciinema.org/a/hZi2gX2k8vtK3ULU6SfrSZOjH)

4. Gendiff можно использовать с вложенными объектами.

[![asciicast](https://asciinema.org/a/1nGvSbXvwL5IBySDRm9mFn7P3.svg)](https://asciinema.org/a/1nGvSbXvwL5IBySDRm9mFn7P3)

5. Gendiff может выводить разницу между файлами в 2-х форматах: stylish (по умолчанию) и plain.
```
gendiff -f stylish
gendiff -f plain
```
[![asciicast](https://asciinema.org/a/j6KJinwWlHqr8aKmAgVS6EN0n.svg)](https://asciinema.org/a/j6KJinwWlHqr8aKmAgVS6EN0n)

6. Gendiff может выводить разницу между файлами в формате json в одну строку.
```
gendiff -f json
```
[![asciicast](https://asciinema.org/a/Sadibip0QwnsorkkiylmhWO1S.svg)](https://asciinema.org/a/Sadibip0QwnsorkkiylmhWO1S)