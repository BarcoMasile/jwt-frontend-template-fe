
#NOME-APP# -> ArpaCitizenHub
#NOME_APP# -> arpa-citizen-hub
#APP-KEY# -> arpaCitizenHubApp

UpCamelCase = '#NOME-APP#'
kebabCase = '#NOME_APP#'
camelCase = '#APP-KEY#'

# $1 upper camel  case
# $2 kebab case
# $3 camelCase

kebab = "$1"
up_camel = "$2"
camel = "${3}App"


grep -HRo "$UpCamelCase" | \
cut -d":" -f 1 | \
while read filename; do
    sed -i "s/$UpCamelCase/$up_camel/g" "$filename"
done

grep -HRo "$kebabCase" | \
cut -d":" -f 1 | \
while read filename; do
    sed -i "s/$kebabCase/$kebab/g" "$filename"
done

grep -HRo "$camelCase" | \
cut -d":" -f 1 | \
while read filename; do
    sed -i "s/$camelCase/$camel/g" "$filename"
done
