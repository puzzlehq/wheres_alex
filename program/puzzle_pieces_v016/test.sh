# The private key and address of the challenger - Alice.
# Swap these in when running transactions as the challenger.
# "private_key": "APrivateKey1zkp9p8bttYsy3EuwiGrb4PXmrtjzZkpGvBCGVCgvpcwVjUV",
# "address": "aleo16hf8hfpwasnn9cf7k2c0dllc56nn7qt547qxgvgwu6pznw4trvqsx68kls"

# The private key and address of the opponent - Bob.
# Swap these in when running transactions as the opponent.
# "private_key": "APrivateKey1zkpALDDK4zAigs387emvnuxWXvGjFw2AmmYcQH7TBt8nhof"
# "address": "aleo1r4pc6ufjvw050jhzrew3vqm2lvacdxfd4a5ckulau0vjc72qvc8sr0jg2a"

# The private key and address of the game multisig.
# Swap these when running transactions from the game multisig.
# "private_key": "APrivateKey1zkp8pmTMT4FxG5qXZ9McEYDdY1G6YokY1BYzwoxTYJEKubF"
# "address": "aleo1asu88azw3uqud282sll23wh3tvmvwjdz5vhvu2jwyrdwtgqn5qgqetuvr6"


# Swap in the private key of the challenger -- Alice.
echo "
NETWORK=testnet3
PRIVATE_KEY=APrivateKey1zkp9p8bttYsy3EuwiGrb4PXmrtjzZkpGvBCGVCgvpcwVjUV
" > .env


echo "
#
#         :::   :::   ::::::::::: ::::    ::: ::::::::::: ::::::::::: ::::    :::  ::::::::
#       :+:+: :+:+:      :+:     :+:+:   :+:     :+:         :+:     :+:+:   :+: :+:    :+:
#     +:+ +:+:+ +:+     +:+     :+:+:+  +:+     +:+         +:+     :+:+:+  +:+ +:+
#    +#+  +:+  +#+     +#+     +#+ +:+ +#+     +#+         +#+     +#+ +:+ +#+ :#:
#   +#+       +#+     +#+     +#+  +#+#+#     +#+         +#+     +#+  +#+#+# +#+   +#+#
#  #+#       #+#     #+#     #+#   #+#+#     #+#         #+#     #+#   #+#+# #+#    #+#
# ###       ### ########### ###    ####     ###     ########### ###    ####  ########
"
leo run mint_private 500u64 aleo16hf8hfpwasnn9cf7k2c0dllc56nn7qt547qxgvgwu6pznw4trvqsx68kls
leo run mint_private 500u64 aleo1r4pc6ufjvw050jhzrew3vqm2lvacdxfd4a5ckulau0vjc72qvc8sr0jg2a

echo "
#
#   ::::::::::: :::::::::      :::     ::::    :::  ::::::::  :::::::::: :::::::::: :::::::::
#      :+:     :+:    :+:   :+: :+:   :+:+:   :+: :+:    :+: :+:        :+:        :+:    :+:
#     +:+     +:+    +:+  +:+   +:+  :+:+:+  +:+ +:+        +:+        +:+        +:+    +:+
#    +#+     +#++:++#:  +#++:++#++: +#+ +:+ +#+ +#++:++#++ :#::+::#   +#++:++#   +#++:++#:
#   +#+     +#+    +#+ +#+     +#+ +#+  +#+#+#        +#+ +#+        +#+        +#+    +#+
#  #+#     #+#    #+# #+#     #+# #+#   #+#+# #+#    #+# #+#        #+#        #+#    #+#
# ###     ###    ### ###     ### ###    ####  ########  ###        ########## ###    ###
"

leo run transfer_private "{
        owner: aleo16hf8hfpwasnn9cf7k2c0dllc56nn7qt547qxgvgwu6pznw4trvqsx68kls.private,
        amount: 500u64.private,
        ix: 0u32.private,
        _nonce: 5117772722354704202838157764917930913180509833961648133377098024993045952079group.public
    }" aleo14qe22anfwd6rfgj53evyxhx8pdqntg8jxc2qvc7j2wypy0j3yuzsae5q08 20u64

echo "
# Challenger Transfering stake in
#
#       :::::::: ::::::::::: :::     :::    ::: ::::::::::           ::::::::::: ::::    :::
#     :+:    :+:    :+:   :+: :+:   :+:   :+:  :+:                      :+:     :+:+:   :+:
#    +:+           +:+  +:+   +:+  +:+  +:+   +:+                      +:+     :+:+:+  +:+
#   +#++:++#++    +#+ +#++:++#++: +#++:++    +#++:++#                 +#+     +#+ +:+ +#+
#         +#+    +#+ +#+     +#+ +#+  +#+   +#+                      +#+     +#+  +#+#+#
# #+#    #+#    #+# #+#     #+# #+#   #+#  #+#                      #+#     #+#   #+#+#
# ########     ### ###     ### ###    ### ##########           ########### ###    ####
"
leo run stake_transfer_in "{
        owner: aleo16hf8hfpwasnn9cf7k2c0dllc56nn7qt547qxgvgwu6pznw4trvqsx68kls.private,
        amount: 500u64.private,
        ix: 0u32.private,
        _nonce: 5117772722354704202838157764917930913180509833961648133377098024993045952079group.public
    }" aleo16hf8hfpwasnn9cf7k2c0dllc56nn7qt547qxgvgwu6pznw4trvqsx68kls aleo16hf8hfpwasnn9cf7k2c0dllc56nn7qt547qxgvgwu6pznw4trvqsx68kls  aleo1r4pc6ufjvw050jhzrew3vqm2lvacdxfd4a5ckulau0vjc72qvc8sr0jg2a aleo1asu88azw3uqud282sll23wh3tvmvwjdz5vhvu2jwyrdwtgqn5qgqetuvr6 100u64 8062328565641143710315198539395259864274213782537700083868207132716559019626field 646976134778083579747150617209623060175268802563807996500102649727939562470field 7738966642647861988443742254957166327730088714215632067055062293849087980027field 501202936879316583063216806269060512965140130553350448375465909870676136661field 478560413032field sign1h04lnsl0t4aau8lzp06rzcm5eqrzr9ew63ljnw43v2nr7nkmsqqcx8cksna2ajwgk80rv0s7prrndw5k56sey3nrl487552lvaukuq8xe0cgu6x809qetnn35ufm3gl6ecyvtpgaavu9y5754j27utrwq8amruqyq2x6dvqs790yqsrctwmjnh3k7thslm0r9c3hpdvjrywpzts24xr

# Swap in the private key of the opponent - Bob.
echo "
NETWORK=testnet3
PRIVATE_KEY=APrivateKey1zkpALDDK4zAigs387emvnuxWXvGjFw2AmmYcQH7TBt8nhof
" > .env

echo "
# Opponent Transfering stake in
#
#       :::::::: ::::::::::: :::     :::    ::: ::::::::::           ::::::::::: ::::    :::
#     :+:    :+:    :+:   :+: :+:   :+:   :+:  :+:                      :+:     :+:+:   :+:
#    +:+           +:+  +:+   +:+  +:+  +:+   +:+                      +:+     :+:+:+  +:+
#   +#++:++#++    +#+ +#++:++#++: +#++:++    +#++:++#                 +#+     +#+ +:+ +#+
#         +#+    +#+ +#+     +#+ +#+  +#+   +#+                      +#+     +#+  +#+#+#
# #+#    #+#    #+# #+#     #+# #+#   #+#  #+#                      #+#     #+#   #+#+#
# ########     ### ###     ### ###    ### ##########           ########### ###    ####
"
leo run stake_transfer_in "{
  owner: aleo1r4pc6ufjvw050jhzrew3vqm2lvacdxfd4a5ckulau0vjc72qvc8sr0jg2a.private,
  amount: 500u64.private,
  ix: 0u32.private,
  _nonce: 2569165330207278565877725231571353138204075897418026244784992123241607190192group.public
}" aleo1r4pc6ufjvw050jhzrew3vqm2lvacdxfd4a5ckulau0vjc72qvc8sr0jg2a aleo16hf8hfpwasnn9cf7k2c0dllc56nn7qt547qxgvgwu6pznw4trvqsx68kls  aleo1r4pc6ufjvw050jhzrew3vqm2lvacdxfd4a5ckulau0vjc72qvc8sr0jg2a aleo1asu88azw3uqud282sll23wh3tvmvwjdz5vhvu2jwyrdwtgqn5qgqetuvr6 100u64 1776434703100582373204662861254489704580562394216162942464580870040464243050field 251561861986387641133995513088278466362266230978294643355666629668300490271field 1152742118437172617676919179607096353215168002720611159713055309066048881777field 6965356107999508170054292104522311809055538516545196583411503498743541220125field 478560413032field sign1nfcgxxyqk5a2fkv3ncrey3pshy20sx66ghdu6mxl94yy75u6pvqhglvhgee7h3cletr2sfnln84q8jyu7060wd3krn5qrajr0jwacqslse2uz49ljzhxz82y28gy0un45z8w2jgwk7jhdgxqh58qgcvwqpcuf9estpjsv9n9jln3x08mzl2rc8z25j6s6r4uf8rq9r7ddkxqyhwu30c



# Swap in the private key of the multisig.

echo "
NETWORK=testnet3
PRIVATE_KEY=APrivateKey1zkp8pmTMT4FxG5qXZ9McEYDdY1G6YokY1BYzwoxTYJEKubF
" > .env

echo "
# Challenger Transferring stake out before going to joint stake
# Assume FE pulls signature from ClaimSignature record and inputs here
#
#       :::::::: ::::::::::: :::     :::    ::: ::::::::::
#     :+:    :+:    :+:   :+: :+:   :+:   :+:  :+:
#    +:+           +:+  +:+   +:+  +:+  +:+   +:+
#   +#++:++#++    +#+ +#++:++#++: +#++:++    +#++:++#
#         +#+    +#+ +#+     +#+ +#+  +#+   +#+
# #+#    #+#    #+# #+#     #+# #+#   #+#  #+#
# ########     ### ###     ### ###    ### ##########
#       ::::::::  :::    ::: :::::::::::
#     :+:    :+: :+:    :+:     :+:
#    +:+    +:+ +:+    +:+     +:+
#   +#+    +:+ +#+    +:+     +#+
#  +#+    +#+ +#+    +#+     +#+
# #+#    #+# #+#    #+#     #+#
# ########   ########      ###
"


leo run stake_transfer_out "{
    owner: aleo1asu88azw3uqud282sll23wh3tvmvwjdz5vhvu2jwyrdwtgqn5qgqetuvr6.private,
    amount: 100u64.private,
    challenger: aleo16hf8hfpwasnn9cf7k2c0dllc56nn7qt547qxgvgwu6pznw4trvqsx68kls.private,
    opponent: aleo1r4pc6ufjvw050jhzrew3vqm2lvacdxfd4a5ckulau0vjc72qvc8sr0jg2a.private,
    staker: aleo16hf8hfpwasnn9cf7k2c0dllc56nn7qt547qxgvgwu6pznw4trvqsx68kls.private,
    ix: 3u32.private,
    _nonce: 5546623805910936542111956375357286045058381276953348239036473112448064414911group.public
    }" "{
    owner: aleo1asu88azw3uqud282sll23wh3tvmvwjdz5vhvu2jwyrdwtgqn5qgqetuvr6.private,
    amount: 100u64.private,
    claimer: aleo16hf8hfpwasnn9cf7k2c0dllc56nn7qt547qxgvgwu6pznw4trvqsx68kls.private,
    message_1: 8062328565641143710315198539395259864274213782537700083868207132716559019626field.private,
    message_2: 646976134778083579747150617209623060175268802563807996500102649727939562470field.private,
    message_3: 7738966642647861988443742254957166327730088714215632067055062293849087980027field.private,
    message_4: 501202936879316583063216806269060512965140130553350448375465909870676136661field.private,
    message_5: 478560413032field.private,
    challenger: aleo16hf8hfpwasnn9cf7k2c0dllc56nn7qt547qxgvgwu6pznw4trvqsx68kls.private,
    opponent: aleo1r4pc6ufjvw050jhzrew3vqm2lvacdxfd4a5ckulau0vjc72qvc8sr0jg2a.private,
    ix: 6u32.private,
    _nonce: 1581604808320267599158086970118371523369918519049360962051611002304272439911group.public
    }" sign1h04lnsl0t4aau8lzp06rzcm5eqrzr9ew63ljnw43v2nr7nkmsqqcx8cksna2ajwgk80rv0s7prrndw5k56sey3nrl487552lvaukuq8xe0cgu6x809qetnn35ufm3gl6ecyvtpgaavu9y5754j27utrwq8amruqyq2x6dvqs790yqsrctwmjnh3k7thslm0r9c3hpdvjrywpzts24xr

echo "
# Opponent Transferring stake out before going to joint stake
# Assume FE pulls signature from ClaimSignature record and inputs here
#
#       :::::::: ::::::::::: :::     :::    ::: ::::::::::
#     :+:    :+:    :+:   :+: :+:   :+:   :+:  :+:
#    +:+           +:+  +:+   +:+  +:+  +:+   +:+
#   +#++:++#++    +#+ +#++:++#++: +#++:++    +#++:++#
#         +#+    +#+ +#+     +#+ +#+  +#+   +#+
# #+#    #+#    #+# #+#     #+# #+#   #+#  #+#
# ########     ### ###     ### ###    ### ##########
#       ::::::::  :::    ::: :::::::::::
#     :+:    :+: :+:    :+:     :+:
#    +:+    +:+ +:+    +:+     +:+
#   +#+    +:+ +#+    +:+     +#+
#  +#+    +#+ +#+    +#+     +#+
# #+#    #+# #+#    #+#     #+#
# ########   ########      ###
"
leo run stake_transfer_out "{
    owner: aleo1asu88azw3uqud282sll23wh3tvmvwjdz5vhvu2jwyrdwtgqn5qgqetuvr6.private,
    amount: 100u64.private,
    challenger: aleo16hf8hfpwasnn9cf7k2c0dllc56nn7qt547qxgvgwu6pznw4trvqsx68kls.private,
    opponent: aleo1r4pc6ufjvw050jhzrew3vqm2lvacdxfd4a5ckulau0vjc72qvc8sr0jg2a.private,
    staker: aleo1r4pc6ufjvw050jhzrew3vqm2lvacdxfd4a5ckulau0vjc72qvc8sr0jg2a.private,
    ix: 3u32.private,
    _nonce: 7597613748382358688796479735356838630107300224224966003778082015449691781571group.public
        }" "{
    owner: aleo1asu88azw3uqud282sll23wh3tvmvwjdz5vhvu2jwyrdwtgqn5qgqetuvr6.private,
    amount: 100u64.private,
    claimer: aleo1r4pc6ufjvw050jhzrew3vqm2lvacdxfd4a5ckulau0vjc72qvc8sr0jg2a.private,
    message_1: 1776434703100582373204662861254489704580562394216162942464580870040464243050field.private,
    message_2: 251561861986387641133995513088278466362266230978294643355666629668300490271field.private,
    message_3: 1152742118437172617676919179607096353215168002720611159713055309066048881777field.private,
    message_4: 6965356107999508170054292104522311809055538516545196583411503498743541220125field.private,
    message_5: 478560413032field.private,
    challenger: aleo16hf8hfpwasnn9cf7k2c0dllc56nn7qt547qxgvgwu6pznw4trvqsx68kls.private,
    opponent: aleo1r4pc6ufjvw050jhzrew3vqm2lvacdxfd4a5ckulau0vjc72qvc8sr0jg2a.private,
    ix: 6u32.private,
    _nonce: 7068698170115610093647313018331847653570039595406910186751810964912876063230group.public
    }" sign1nfcgxxyqk5a2fkv3ncrey3pshy20sx66ghdu6mxl94yy75u6pvqhglvhgee7h3cletr2sfnln84q8jyu7060wd3krn5qrajr0jwacqslse2uz49ljzhxz82y28gy0un45z8w2jgwk7jhdgxqh58qgcvwqpcuf9estpjsv9n9jln3x08mzl2rc8z25j6s6r4uf8rq9r7ddkxqyhwu30c


echo "
#   ::::::::::: :::::::::      :::     ::::    :::  ::::::::  :::::::::: :::::::::: :::::::::
#      :+:     :+:    :+:   :+: :+:   :+:+:   :+: :+:    :+: :+:        :+:        :+:    :+:
#     +:+     +:+    +:+  +:+   +:+  :+:+:+  +:+ +:+        +:+        +:+        +:+    +:+
#    +#+     +#++:++#:  +#++:++#++: +#+ +:+ +#+ +#++:++#++ :#::+::#   +#++:++#   +#++:++#:
#   +#+     +#+    +#+ +#+     +#+ +#+  +#+#+#        +#+ +#+        +#+        +#+    +#+
#  #+#     #+#    #+# #+#     #+# #+#   #+#+# #+#    #+# #+#        #+#        #+#    #+#
# ###     ###    ### ###     ### ###    ####  ########  ###        ########## ###    ###
#       :::::::: ::::::::::: :::     :::    ::: :::::::::: ::::::::       ::::::::::: ::::::::
#     :+:    :+:    :+:   :+: :+:   :+:   :+:  :+:       :+:    :+:          :+:    :+:    :+:
#    +:+           +:+  +:+   +:+  +:+  +:+   +:+       +:+                 +:+    +:+    +:+
#   +#++:++#++    +#+ +#++:++#++: +#++:++    +#++:++#  +#++:++#++          +#+    +#+    +:+
#         +#+    +#+ +#+     +#+ +#+  +#+   +#+              +#+          +#+    +#+    +#+
# #+#    #+#    #+# #+#     #+# #+#   #+#  #+#       #+#    #+#          #+#    #+#    #+#
# ########     ### ###     ### ###    ### ########## ########           ###     ########
#      ::::::::::: :::::::: ::::::::::: ::::    ::: :::::::::::
#         :+:    :+:    :+:    :+:     :+:+:   :+:     :+:
#        +:+    +:+    +:+    +:+     :+:+:+  +:+     +:+
#       +#+    +#+    +:+    +#+     +#+ +:+ +#+     +#+
#      +#+    +#+    +#+    +#+     +#+  +#+#+#     +#+
# #+# #+#    #+#    #+#    #+#     #+#   #+#+#     #+#
# #####      ######## ########### ###    ####     ###
"
leo run transfer_stakes_to_joint "{
    owner: aleo1asu88azw3uqud282sll23wh3tvmvwjdz5vhvu2jwyrdwtgqn5qgqetuvr6.private,
    amount: 100u64.private,
    challenger: aleo16hf8hfpwasnn9cf7k2c0dllc56nn7qt547qxgvgwu6pznw4trvqsx68kls.private,
    opponent: aleo1r4pc6ufjvw050jhzrew3vqm2lvacdxfd4a5ckulau0vjc72qvc8sr0jg2a.private,
    staker: aleo16hf8hfpwasnn9cf7k2c0dllc56nn7qt547qxgvgwu6pznw4trvqsx68kls.private,
    ix: 3u32.private,
    _nonce: 3905695628549258996231504976644150611704896903336505283629712393764912147881group.public
    }" "{
    owner: aleo1asu88azw3uqud282sll23wh3tvmvwjdz5vhvu2jwyrdwtgqn5qgqetuvr6.private,
    amount: 100u64.private,
    claimer: aleo16hf8hfpwasnn9cf7k2c0dllc56nn7qt547qxgvgwu6pznw4trvqsx68kls.private,
    message_1: 8062328565641143710315198539395259864274213782537700083868207132716559019626field.private,
    message_2: 646976134778083579747150617209623060175268802563807996500102649727939562470field.private,
    message_3: 7738966642647861988443742254957166327730088714215632067055062293849087980027field.private,
    message_4: 501202936879316583063216806269060512965140130553350448375465909870676136661field.private,
    message_5: 478560413032field.private,
    challenger: aleo16hf8hfpwasnn9cf7k2c0dllc56nn7qt547qxgvgwu6pznw4trvqsx68kls.private,
    opponent: aleo1r4pc6ufjvw050jhzrew3vqm2lvacdxfd4a5ckulau0vjc72qvc8sr0jg2a.private,
    ix: 6u32.private,
    _nonce: 3659284411785173763655469676694256156580832627787914348759072583339004320462group.public
    }" "{
    owner: aleo1asu88azw3uqud282sll23wh3tvmvwjdz5vhvu2jwyrdwtgqn5qgqetuvr6.private,
    amount: 100u64.private,
    challenger: aleo16hf8hfpwasnn9cf7k2c0dllc56nn7qt547qxgvgwu6pznw4trvqsx68kls.private,
    opponent: aleo1r4pc6ufjvw050jhzrew3vqm2lvacdxfd4a5ckulau0vjc72qvc8sr0jg2a.private,
    staker: aleo1r4pc6ufjvw050jhzrew3vqm2lvacdxfd4a5ckulau0vjc72qvc8sr0jg2a.private,
    ix: 3u32.private,
    _nonce: 2091551707311829683057081961908092597682984023458416846802134854010256172992group.public
    }" "{
    owner: aleo1asu88azw3uqud282sll23wh3tvmvwjdz5vhvu2jwyrdwtgqn5qgqetuvr6.private,
    amount: 100u64.private,
    claimer: aleo1r4pc6ufjvw050jhzrew3vqm2lvacdxfd4a5ckulau0vjc72qvc8sr0jg2a.private,
    message_1: 1776434703100582373204662861254489704580562394216162942464580870040464243050field.private,
    message_2: 251561861986387641133995513088278466362266230978294643355666629668300490271field.private,
    message_3: 1152742118437172617676919179607096353215168002720611159713055309066048881777field.private,
    message_4: 6965356107999508170054292104522311809055538516545196583411503498743541220125field.private,
    message_5: 478560413032field.private,
    challenger: aleo16hf8hfpwasnn9cf7k2c0dllc56nn7qt547qxgvgwu6pznw4trvqsx68kls.private,
    opponent: aleo1r4pc6ufjvw050jhzrew3vqm2lvacdxfd4a5ckulau0vjc72qvc8sr0jg2a.private,
    ix: 6u32.private,
    _nonce: 2646520178021872335709140905256437534246948180735119872182997801144216021745group.public
    }" 385600u32



# Swap in the private key of the challenger -- Alice.
echo "
NETWORK=testnet3
PRIVATE_KEY=APrivateKey1zkp9p8bttYsy3EuwiGrb4PXmrtjzZkpGvBCGVCgvpcwVjUV
" > .env


echo "
#      ::::::::::: :::::::: ::::::::::: ::::    ::: :::::::::::
#         :+:    :+:    :+:    :+:     :+:+:   :+:     :+:
#        +:+    +:+    +:+    +:+     :+:+:+  +:+     +:+
#       +#+    +#+    +:+    +#+     +#+ +:+ +#+     +#+
#      +#+    +#+    +#+    +#+     +#+  +#+#+#     +#+
# #+# #+#    #+#    #+#    #+#     #+#   #+#+#     #+#
# #####      ######## ########### ###    ####     ###
#       :::::::: ::::::::::: :::     :::    ::: ::::::::::
#     :+:    :+:    :+:   :+: :+:   :+:   :+:  :+:
#    +:+           +:+  +:+   +:+  +:+  +:+   +:+
#   +#++:++#++    +#+ +#++:++#++: +#++:++    +#++:++#
#         +#+    +#+ +#+     +#+ +#+  +#+   +#+
# #+#    #+#    #+# #+#     #+# #+#   #+#  #+#
# ########     ### ###     ### ###    ### ##########
#       :::::::: ::::::::::: ::: ::::::::::: ::::::::::
#     :+:    :+:    :+:   :+: :+:   :+:     :+:
#    +:+           +:+  +:+   +:+  +:+     +:+
#   +#++:++#++    +#+ +#++:++#++: +#+     +#++:++#
#         +#+    +#+ +#+     +#+ +#+     +#+
# #+#    #+#    #+# #+#     #+# #+#     #+#
# ########     ### ###     ### ###     ##########
#      :::    ::: :::::::::  :::::::::      ::: ::::::::::: ::::::::::
#     :+:    :+: :+:    :+: :+:    :+:   :+: :+:   :+:     :+:
#    +:+    +:+ +:+    +:+ +:+    +:+  +:+   +:+  +:+     +:+
#   +#+    +:+ +#++:++#+  +#+    +:+ +#++:++#++: +#+     +#++:++#
#  +#+    +#+ +#+        +#+    +#+ +#+     +#+ +#+     +#+
# #+#    #+# #+#        #+#    #+# #+#     #+# #+#     #+#
# ########  ###        #########  ###     ### ###     ##########
"

leo run joint_stake_state_update "{
    owner: aleo16hf8hfpwasnn9cf7k2c0dllc56nn7qt547qxgvgwu6pznw4trvqsx68kls.private,
    amount: 200u64.private,
    time_claimer_address: aleo1r4pc6ufjvw050jhzrew3vqm2lvacdxfd4a5ckulau0vjc72qvc8sr0jg2a.private,
    state_updater_address: aleo16hf8hfpwasnn9cf7k2c0dllc56nn7qt547qxgvgwu6pznw4trvqsx68kls.private,
    message_1: 8062328565641143710315198539395259864274213782537700083868207132716559019626field.private,
    message_2: 646976134778083579747150617209623060175268802563807996500102649727939562470field.private,
    message_3: 7738966642647861988443742254957166327730088714215632067055062293849087980027field.private,
    message_4: 501202936879316583063216806269060512965140130553350448375465909870676136661field.private,
    message_5: 478560413032field.private,
    challenger: aleo16hf8hfpwasnn9cf7k2c0dllc56nn7qt547qxgvgwu6pznw4trvqsx68kls.private,
    opponent: aleo1r4pc6ufjvw050jhzrew3vqm2lvacdxfd4a5ckulau0vjc72qvc8sr0jg2a.private,
    game_multisig: aleo1asu88azw3uqud282sll23wh3tvmvwjdz5vhvu2jwyrdwtgqn5qgqetuvr6.private,
    ix: 10u32.private,
    _nonce: 4854220735381631329294859919280502844214351686096777666857873722313764297377group.public
    }" "{
    owner: aleo16hf8hfpwasnn9cf7k2c0dllc56nn7qt547qxgvgwu6pznw4trvqsx68kls.private,
    sig: sign1h04lnsl0t4aau8lzp06rzcm5eqrzr9ew63ljnw43v2nr7nkmsqqcx8cksna2ajwgk80rv0s7prrndw5k56sey3nrl487552lvaukuq8xe0cgu6x809qetnn35ufm3gl6ecyvtpgaavu9y5754j27utrwq8amruqyq2x6dvqs790yqsrctwmjnh3k7thslm0r9c3hpdvjrywpzts24xr.private,
    amount: 100u64.private,
    game_multisig: aleo1asu88azw3uqud282sll23wh3tvmvwjdz5vhvu2jwyrdwtgqn5qgqetuvr6.private,
    challenger: aleo16hf8hfpwasnn9cf7k2c0dllc56nn7qt547qxgvgwu6pznw4trvqsx68kls.private,
    opponent: aleo1r4pc6ufjvw050jhzrew3vqm2lvacdxfd4a5ckulau0vjc72qvc8sr0jg2a.private,
    ix: 7u32.private,
    _nonce: 1117369446048084795887471758559779986210421151862901081628519228619183511648group.public
    }" aleo1r4pc6ufjvw050jhzrew3vqm2lvacdxfd4a5ckulau0vjc72qvc8sr0jg2a


# Swap in the private key of the multisig.

echo "
NETWORK=testnet3
PRIVATE_KEY=APrivateKey1zkp8pmTMT4FxG5qXZ9McEYDdY1G6YokY1BYzwoxTYJEKubF
" > .env

echo "
#      ::::::::::: :::::::: ::::::::::: ::::    ::: :::::::::::
#         :+:    :+:    :+:    :+:     :+:+:   :+:     :+:
#        +:+    +:+    +:+    +:+     :+:+:+  +:+     +:+
#       +#+    +#+    +:+    +#+     +#+ +:+ +#+     +#+
#      +#+    +#+    +#+    +#+     +#+  +#+#+#     +#+
# #+# #+#    #+#    #+#    #+#     #+#   #+#+#     #+#
# #####      ######## ########### ###    ####     ###
#       :::::::: ::::::::::: :::     :::    ::: ::::::::::
#     :+:    :+:    :+:   :+: :+:   :+:   :+:  :+:
#    +:+           +:+  +:+   +:+  +:+  +:+   +:+
#   +#++:++#++    +#+ +#++:++#++: +#++:++    +#++:++#
#         +#+    +#+ +#+     +#+ +#+  +#+   +#+
# #+#    #+#    #+# #+#     #+# #+#   #+#  #+#
# ########     ### ###     ### ###    ### ##########
#   ::::::::::: :::::::::      :::     ::::    :::  ::::::::  :::::::::: :::::::::: :::::::::
#      :+:     :+:    :+:   :+: :+:   :+:+:   :+: :+:    :+: :+:        :+:        :+:    :+:
#     +:+     +:+    +:+  +:+   +:+  :+:+:+  +:+ +:+        +:+        +:+        +:+    +:+
#    +#+     +#++:++#:  +#++:++#++: +#+ +:+ +#+ +#++:++#++ :#::+::#   +#++:++#   +#++:++#:
#   +#+     +#+    +#+ +#+     +#+ +#+  +#+#+#        +#+ +#+        +#+        +#+    +#+
#  #+#     #+#    #+# #+#     #+# #+#   #+#+# #+#    #+# #+#        #+#        #+#    #+#
# ###     ###    ### ###     ### ###    ####  ########  ###        ########## ###    ###
#   ::::::::::: ::::::::
#      :+:    :+:    :+:
#     +:+    +:+    +:+
#    +#+    +#+    +:+
#   +#+    +#+    +#+
#  #+#    #+#    #+#
# ###     ########
#     :::       ::: ::::::::::: ::::    ::: ::::    ::: :::::::::: :::::::::
#    :+:       :+:     :+:     :+:+:   :+: :+:+:   :+: :+:        :+:    :+:
#   +:+       +:+     +:+     :+:+:+  +:+ :+:+:+  +:+ +:+        +:+    +:+
#  +#+  +:+  +#+     +#+     +#+ +:+ +#+ +#+ +:+ +#+ +#++:++#   +#++:++#:
# +#+ +#+#+ +#+     +#+     +#+  +#+#+# +#+  +#+#+# +#+        +#+    +#+
# #+#+# #+#+#      #+#     #+#   #+#+# #+#   #+#+# #+#        #+#    #+#
# ###   ###   ########### ###    #### ###    #### ########## ###    ###
"

leo run joint_stake_transfer_to_winner "{
    owner: aleo1asu88azw3uqud282sll23wh3tvmvwjdz5vhvu2jwyrdwtgqn5qgqetuvr6.private,
    amount: 200u64.private,
    time_claimer_address: aleo1r4pc6ufjvw050jhzrew3vqm2lvacdxfd4a5ckulau0vjc72qvc8sr0jg2a.private,
    state_updater_address: aleo16hf8hfpwasnn9cf7k2c0dllc56nn7qt547qxgvgwu6pznw4trvqsx68kls.private,
    challenger: aleo16hf8hfpwasnn9cf7k2c0dllc56nn7qt547qxgvgwu6pznw4trvqsx68kls.private,
    opponent: aleo1r4pc6ufjvw050jhzrew3vqm2lvacdxfd4a5ckulau0vjc72qvc8sr0jg2a.private,
    game_multisig: aleo1asu88azw3uqud282sll23wh3tvmvwjdz5vhvu2jwyrdwtgqn5qgqetuvr6.private,
    winner: aleo1r4pc6ufjvw050jhzrew3vqm2lvacdxfd4a5ckulau0vjc72qvc8sr0jg2a.private,
    ix: 12u32.private,
    _nonce: 819217470275539396656331726123427022950770708026893222204090462472778558761group.public
    }" "{
    owner: aleo1asu88azw3uqud282sll23wh3tvmvwjdz5vhvu2jwyrdwtgqn5qgqetuvr6.private,
    amount: 200u64.private,
    time_claimer_address: aleo1r4pc6ufjvw050jhzrew3vqm2lvacdxfd4a5ckulau0vjc72qvc8sr0jg2a.private,
    state_updater_address: aleo16hf8hfpwasnn9cf7k2c0dllc56nn7qt547qxgvgwu6pznw4trvqsx68kls.private,
    block_ht: 385600u32.private,
    ix: 9u32.private,
    _nonce: 8424505377911656497167237030609757345140690015076937010580009679888038203300group.public
    }" "{
    owner: aleo1asu88azw3uqud282sll23wh3tvmvwjdz5vhvu2jwyrdwtgqn5qgqetuvr6.private,
    amount: 200u64.private,
    time_claimer_address: aleo1r4pc6ufjvw050jhzrew3vqm2lvacdxfd4a5ckulau0vjc72qvc8sr0jg2a.private,
    state_updater_address: aleo16hf8hfpwasnn9cf7k2c0dllc56nn7qt547qxgvgwu6pznw4trvqsx68kls.private,
    message_1: 1776434703100582373204662861254489704580562394216162942464580870040464243050field.private,
    message_2: 251561861986387641133995513088278466362266230978294643355666629668300490271field.private,
    message_3: 1152742118437172617676919179607096353215168002720611159713055309066048881777field.private,
    message_4: 6965356107999508170054292104522311809055538516545196583411503498743541220125field.private,
    message_5: 478560413032field.private,
    game_multisig: aleo1asu88azw3uqud282sll23wh3tvmvwjdz5vhvu2jwyrdwtgqn5qgqetuvr6.private,
    challenger: aleo16hf8hfpwasnn9cf7k2c0dllc56nn7qt547qxgvgwu6pznw4trvqsx68kls.private,
    opponent: aleo1r4pc6ufjvw050jhzrew3vqm2lvacdxfd4a5ckulau0vjc72qvc8sr0jg2a.private,
    block_ht: 385600u32.private,
    ix: 8u32.private,
    _nonce: 5872412729651615670150493387377488356135011849801053613442039319914903040739group.public
    }"

echo "
#      ::::::::::: :::::::: ::::::::::: ::::    ::: :::::::::::
#         :+:    :+:    :+:    :+:     :+:+:   :+:     :+:
#        +:+    +:+    +:+    +:+     :+:+:+  +:+     +:+
#       +#+    +#+    +:+    +#+     +#+ +:+ +#+     +#+
#      +#+    +#+    +#+    +#+     +#+  +#+#+#     +#+
# #+# #+#    #+#    #+#    #+#     #+#   #+#+#     #+#
# #####      ######## ########### ###    ####     ###
#   ::::::::::: :::::::::::   :::   :::   ::::::::::
#      :+:         :+:      :+:+: :+:+:  :+:
#     +:+         +:+     +:+ +:+:+ +:+ +:+
#    +#+         +#+     +#+  +:+  +#+ +#++:++#   +#++:++#++:++
#   +#+         +#+     +#+       +#+ +#+
#  #+#         #+#     #+#       #+# #+#
# ###     ########### ###       ### ##########
#       ::::::::  :::    ::: :::::::::::       ::::::::::: ::::::::
#     :+:    :+: :+:    :+:     :+:               :+:    :+:    :+:
#    +:+    +:+ +:+    +:+     +:+               +:+    +:+    +:+
#   +#+    +:+ +#+    +:+     +#+               +#+    +#+    +:+
#  +#+    +#+ +#+    +#+     +#+               +#+    +#+    +#+
# #+#    #+# #+#    #+#     #+#               #+#    #+#    #+#
# ########   ########      ###               ###     ########
#       ::::::::  :::::::::  :::::::::
#     :+:    :+: :+:    :+: :+:    :+:
#    +:+    +:+ +:+    +:+ +:+    +:+
#   +#+    +:+ +#++:++#+  +#++:++#+
#  +#+    +#+ +#+        +#+
# #+#    #+# #+#        #+#
# ########  ###        ###
"

leo run joint_timeout_to_opponent "{
    owner: aleo1asu88azw3uqud282sll23wh3tvmvwjdz5vhvu2jwyrdwtgqn5qgqetuvr6.private,
    amount: 200u64.private,
    time_claimer_address: aleo1r4pc6ufjvw050jhzrew3vqm2lvacdxfd4a5ckulau0vjc72qvc8sr0jg2a.private,
    state_updater_address: aleo16hf8hfpwasnn9cf7k2c0dllc56nn7qt547qxgvgwu6pznw4trvqsx68kls.private,
    block_ht: 385600u32.private,
    ix: 9u32.private,
    _nonce: 8424505377911656497167237030609757345140690015076937010580009679888038203300group.public
    }" "{
    owner: aleo1asu88azw3uqud282sll23wh3tvmvwjdz5vhvu2jwyrdwtgqn5qgqetuvr6.private,
    amount: 200u64.private,
    time_claimer_address: aleo1r4pc6ufjvw050jhzrew3vqm2lvacdxfd4a5ckulau0vjc72qvc8sr0jg2a.private,
    state_updater_address: aleo16hf8hfpwasnn9cf7k2c0dllc56nn7qt547qxgvgwu6pznw4trvqsx68kls.private,
    message_1: 1776434703100582373204662861254489704580562394216162942464580870040464243050field.private,
    message_2: 251561861986387641133995513088278466362266230978294643355666629668300490271field.private,
    message_3: 1152742118437172617676919179607096353215168002720611159713055309066048881777field.private,
    message_4: 6965356107999508170054292104522311809055538516545196583411503498743541220125field.private,
    message_5: 478560413032field.private,
    game_multisig: aleo1asu88azw3uqud282sll23wh3tvmvwjdz5vhvu2jwyrdwtgqn5qgqetuvr6.private,
    challenger: aleo16hf8hfpwasnn9cf7k2c0dllc56nn7qt547qxgvgwu6pznw4trvqsx68kls.private,
    opponent: aleo1r4pc6ufjvw050jhzrew3vqm2lvacdxfd4a5ckulau0vjc72qvc8sr0jg2a.private,
    block_ht: 385600u32.private,
    ix: 8u32.private,
    _nonce: 5872412729651615670150493387377488356135011849801053613442039319914903040739group.public
    }" sign1nfcgxxyqk5a2fkv3ncrey3pshy20sx66ghdu6mxl94yy75u6pvqhglvhgee7h3cletr2sfnln84q8jyu7060wd3krn5qrajr0jwacqslse2uz49ljzhxz82y28gy0un45z8w2jgwk7jhdgxqh58qgcvwqpcuf9estpjsv9n9jln3x08mzl2rc8z25j6s6r4uf8rq9r7ddkxqyhwu30c