cd ../../
rm -rf baas-examples-internal
git clone https://github.com/Lazare-42/baas-examples-internal
rm -rf baas-examples-internal/*
cp -r ./meeting-bot-as-a-service/* ./baas-examples-internal/
cd baas-examples-internal/
git add .
git commit -m "Merge remote-tracking branch 'repo-a/main'"
git push
