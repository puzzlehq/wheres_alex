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
#       :::::::::  :::::::::   ::::::::  :::::::::   ::::::::   ::::::::  ::::::::::
#      :+:    :+: :+:    :+: :+:    :+: :+:    :+: :+:    :+: :+:    :+: :+:
#     +:+    +:+ +:+    +:+ +:+    +:+ +:+    +:+ +:+    +:+ +:+        +:+
#    +#++:++#+  +#++:++#:  +#+    +:+ +#++:++#+  +#+    +:+ +#++:++#++ +#++:++#
#   +#+        +#+    +#+ +#+    +#+ +#+        +#+    +#+        +#+ +#+
#  #+#        #+#    #+# #+#    #+# #+#        #+#    #+# #+#    #+# #+#
# ###        ###    ###  ########  ###         ########   ########  ##########
#       ::::::::      :::       :::   :::   ::::::::::
#     :+:    :+:   :+: :+:    :+:+: :+:+:  :+:
#    +:+         +:+   +:+  +:+ +:+:+ +:+ +:+
#   :#:        +#++:++#++: +#+  +:+  +#+ +#++:++#
#  +#+   +#+# +#+     +#+ +#+       +#+ +#+
# #+#    #+# #+#     #+# #+#       #+# #+#
# ########  ###     ### ###       ### ##########
"

leo run propose_game "{
        owner: aleo16hf8hfpwasnn9cf7k2c0dllc56nn7qt547qxgvgwu6pznw4trvqsx68kls.private,
        amount: 500u64.private,
        ix: 0u32.private,
        _nonce: 5117772722354704202838157764917930913180509833961648133377098024993045952079group.public
    }" 100u64 aleo16hf8hfpwasnn9cf7k2c0dllc56nn7qt547qxgvgwu6pznw4trvqsx68kls aleo16hf8hfpwasnn9cf7k2c0dllc56nn7qt547qxgvgwu6pznw4trvqsx68kls aleo1r4pc6ufjvw050jhzrew3vqm2lvacdxfd4a5ckulau0vjc72qvc8sr0jg2a aleo1asu88azw3uqud282sll23wh3tvmvwjdz5vhvu2jwyrdwtgqn5qgqetuvr6 8062328565641143710315198539395259864274213782537700083868207132716559019626field 646976134778083579747150617209623060175268802563807996500102649727939562470field 7738966642647861988443742254957166327730088714215632067055062293849087980027field 501202936879316583063216806269060512965140130553350448375465909870676136661field 478560413032field sign1h04lnsl0t4aau8lzp06rzcm5eqrzr9ew63ljnw43v2nr7nkmsqqcx8cksna2ajwgk80rv0s7prrndw5k56sey3nrl487552lvaukuq8xe0cgu6x809qetnn35ufm3gl6ecyvtpgaavu9y5754j27utrwq8amruqyq2x6dvqs790yqsrctwmjnh3k7thslm0r9c3hpdvjrywpzts24xr 12345field 0field 98765field

# Swap in the private key of the opponent - Bob.
echo "
NETWORK=testnet3
PRIVATE_KEY=APrivateKey1zkpALDDK4zAigs387emvnuxWXvGjFw2AmmYcQH7TBt8nhof
" > .env

echo "
#       ::::::::  :::    ::: :::::::::    :::   :::   ::::::::::: :::::::::::
#     :+:    :+: :+:    :+: :+:    :+:  :+:+: :+:+:      :+:         :+:
#    +:+        +:+    +:+ +:+    +:+ +:+ +:+:+ +:+     +:+         +:+
#   +#++:++#++ +#+    +:+ +#++:++#+  +#+  +:+  +#+     +#+         +#+
#         +#+ +#+    +#+ +#+    +#+ +#+       +#+     +#+         +#+
# #+#    #+# #+#    #+# #+#    #+# #+#       #+#     #+#         #+#
# ########   ########  #########  ###       ### ###########     ###
#     :::       :::     :::      ::::::::  :::::::::: :::::::::
#    :+:       :+:   :+: :+:   :+:    :+: :+:        :+:    :+:
#   +:+       +:+  +:+   +:+  +:+        +:+        +:+    +:+
#  +#+  +:+  +#+ +#++:++#++: :#:        +#++:++#   +#++:++#:
# +#+ +#+#+ +#+ +#+     +#+ +#+   +#+# +#+        +#+    +#+
# #+#+# #+#+#  #+#     #+# #+#    #+# #+#        #+#    #+#
# ###   ###   ###     ###  ########  ########## ###    ###
"

leo run submit_wager "{
  owner: aleo1r4pc6ufjvw050jhzrew3vqm2lvacdxfd4a5ckulau0vjc72qvc8sr0jg2a.private,
  amount: 500u64.private,
  ix: 0u32.private,
  _nonce: 3004940205258698961047675300612628178407977124226246568871909567528102781306group.public
}" "{
  owner: aleo1r4pc6ufjvw050jhzrew3vqm2lvacdxfd4a5ckulau0vjc72qvc8sr0jg2a.private,
  seed: 98765field.private,
  amount: 100u64.private,
  challenger: aleo16hf8hfpwasnn9cf7k2c0dllc56nn7qt547qxgvgwu6pznw4trvqsx68kls.private,
  opponent: aleo1r4pc6ufjvw050jhzrew3vqm2lvacdxfd4a5ckulau0vjc72qvc8sr0jg2a.private,
  game_multisig: aleo1asu88azw3uqud282sll23wh3tvmvwjdz5vhvu2jwyrdwtgqn5qgqetuvr6.private,
  ix: 5u32.private,
  _nonce: 614304942627494924156540954346562345174322008762458420667361217491279792987group.public
}" "{
  owner: aleo1r4pc6ufjvw050jhzrew3vqm2lvacdxfd4a5ckulau0vjc72qvc8sr0jg2a.private,
  game_multisig: aleo1asu88azw3uqud282sll23wh3tvmvwjdz5vhvu2jwyrdwtgqn5qgqetuvr6.private,
  game_state: 1field.private,
  your_turn: true.private,
  total_pot: 200u64.private,
  challenger_address: aleo16hf8hfpwasnn9cf7k2c0dllc56nn7qt547qxgvgwu6pznw4trvqsx68kls.private,
  opponent_address: aleo1r4pc6ufjvw050jhzrew3vqm2lvacdxfd4a5ckulau0vjc72qvc8sr0jg2a.private,
  ix: 2u32.private,
  _nonce: 5007203806498158254911228558413488930295100188486359169745660062379448997833group.public
}" 4299148155668445410404796665478412871867472362428312345599969289162437917169field 251561861986387641133995513088278466362266230978294643355666629668300490271field 1152742118437172617676919179607096353215168002720611159713055309066048881777field 6965356107999508170054292104522311809055538516545196583411503498743541220125field 478560413032field sign1j0hhruukxrlddx4tzzpe8gccgy3l430el69e0jpclrzk2x3kecpq7zteu9z5qqqttk4xltyplgwzt4famkfxar5wjncz5ttssdur2qslse2uz49ljzhxz82y28gy0un45z8w2jgwk7jhdgxqh58qgcvwqpcuf9estpjsv9n9jln3x08mzl2rc8z25j6s6r4uf8rq9r7ddkxqyaahcxh

# Swap in the private key of the multisig.

echo "
NETWORK=testnet3
PRIVATE_KEY=APrivateKey1zkp8pmTMT4FxG5qXZ9McEYDdY1G6YokY1BYzwoxTYJEKubF
" > .env

echo "
#           :::      ::::::::   ::::::::  :::::::::: ::::::::: :::::::::::
#        :+: :+:   :+:    :+: :+:    :+: :+:        :+:    :+:    :+:
#      +:+   +:+  +:+        +:+        +:+        +:+    +:+    +:+
#    +#++:++#++: +#+        +#+        +#++:++#   +#++:++#+     +#+
#   +#+     +#+ +#+        +#+        +#+        +#+           +#+
#  #+#     #+# #+#    #+# #+#    #+# #+#        #+#           #+#
# ###     ###  ########   ########  ########## ###           ###
#       ::::::::      :::       :::   :::   ::::::::::
#     :+:    :+:   :+: :+:    :+:+: :+:+:  :+:
#    +:+         +:+   +:+  +:+ +:+:+ +:+ +:+
#   :#:        +#++:++#++: +#+  +:+  +#+ +#++:++#
#  +#+   +#+# +#+     +#+ +#+       +#+ +#+
# #+#    #+# #+#     #+# #+#       #+# #+#
# ########  ###     ### ###       ### ##########
"

# transition accept_game
#     (
#         game_record: Game,
#         opponent_answer: field,
#         piece_stake_challenger: puzzle_pieces_v008.leo/PieceStake.record,
#         piece_claim_challenger: puzzle_pieces_v008.leo/PieceClaim.record,
#         piece_stake_opponent: puzzle_pieces_v008.leo/PieceStake.record,
#         piece_claim_opponent: puzzle_pieces_v008.leo/PieceClaim.record,
#         block_ht: u32,
#     )

leo run accept_game "{
    owner: aleo1asu88azw3uqud282sll23wh3tvmvwjdz5vhvu2jwyrdwtgqn5qgqetuvr6.private,
    challenger_commit: 1632338669887332693450432112819554759682427161589172463360656597380489639523field.private,
    opponent_answer: 0field.private,
    total_pot: 200u64.private,
    challenger_address: aleo16hf8hfpwasnn9cf7k2c0dllc56nn7qt547qxgvgwu6pznw4trvqsx68kls.private,
    opponent_address: aleo1r4pc6ufjvw050jhzrew3vqm2lvacdxfd4a5ckulau0vjc72qvc8sr0jg2a.private,
    game_multisig: aleo1asu88azw3uqud282sll23wh3tvmvwjdz5vhvu2jwyrdwtgqn5qgqetuvr6.private,
    game_state: 1field.private,
    ix: 0u32.private,
    _nonce: 7317720964287754030180000298351657566658550240415053730543526730746196923728group.public
  }" 0field "{
    owner: aleo1asu88azw3uqud282sll23wh3tvmvwjdz5vhvu2jwyrdwtgqn5qgqetuvr6.private,
    amount: 100u64.private,
    challenger: aleo16hf8hfpwasnn9cf7k2c0dllc56nn7qt547qxgvgwu6pznw4trvqsx68kls.private,
    opponent: aleo1r4pc6ufjvw050jhzrew3vqm2lvacdxfd4a5ckulau0vjc72qvc8sr0jg2a.private,
    staker: aleo16hf8hfpwasnn9cf7k2c0dllc56nn7qt547qxgvgwu6pznw4trvqsx68kls.private,
    ix: 3u32.private,
    _nonce: 1171432541040874548250929502681399288885050493667972397387185700646746850159group.public
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
    _nonce: 4810662774726267156301158455083092801351285424752992399701699702277668157037group.public
  }" "{
    owner: aleo1asu88azw3uqud282sll23wh3tvmvwjdz5vhvu2jwyrdwtgqn5qgqetuvr6.private,
    amount: 100u64.private,
    challenger: aleo16hf8hfpwasnn9cf7k2c0dllc56nn7qt547qxgvgwu6pznw4trvqsx68kls.private,
    opponent: aleo1r4pc6ufjvw050jhzrew3vqm2lvacdxfd4a5ckulau0vjc72qvc8sr0jg2a.private,
    staker: aleo1r4pc6ufjvw050jhzrew3vqm2lvacdxfd4a5ckulau0vjc72qvc8sr0jg2a.private,
    ix: 3u32.private,
    _nonce: 599889142096431066659827958356335087441348924043773473903678399640857634581group.public
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
    _nonce: 6914679112537858302476465449822610182325897881098010092113211151799315162492group.public
  }" 100000u32

# Swap in the private key of the challenger -- Alice.
echo "
NETWORK=testnet3
PRIVATE_KEY=APrivateKey1zkp9p8bttYsy3EuwiGrb4PXmrtjzZkpGvBCGVCgvpcwVjUV
" > .env

echo "
#       :::::::::  :::::::::: :::     ::: ::::::::::     :::     :::
#      :+:    :+: :+:        :+:     :+: :+:          :+: :+:   :+:
#     +:+    +:+ +:+        +:+     +:+ +:+         +:+   +:+  +:+
#    +#++:++#:  +#++:++#   +#+     +:+ +#++:++#   +#++:++#++: +#+
#   +#+    +#+ +#+         +#+   +#+  +#+        +#+     +#+ +#+
#  #+#    #+# #+#          #+#+#+#   #+#        #+#     #+# #+#
# ###    ### ##########     ###     ########## ###     ### ##########
#           :::     ::::    :::  ::::::::  :::       ::: :::::::::: :::::::::
#        :+: :+:   :+:+:   :+: :+:    :+: :+:       :+: :+:        :+:    :+:
#      +:+   +:+  :+:+:+  +:+ +:+        +:+       +:+ +:+        +:+    +:+
#    +#++:++#++: +#+ +:+ +#+ +#++:++#++ +#+  +:+  +#+ +#++:++#   +#++:++#:
#   +#+     +#+ +#+  +#+#+#        +#+ +#+ +#+#+ +#+ +#+        +#+    +#+
#  #+#     #+# #+#   #+#+# #+#    #+#  #+#+# #+#+#  #+#        #+#    #+#
# ###     ### ###    ####  ########    ###   ###   ########## ###    ###
"

#leo run reveal_answer

# transition reveal_answer_game
#     (
#         reveal_answer_notification_record: RevealAnswerNotification,
#         answer_record: multiparty_pvp_utils_v008.leo/Answer.record,
#         joint_piece_state: puzzle_pieces_v008.leo/JointPieceState.record,
#         claim_signature: puzzle_pieces_v008.leo/ClaimSignature.record,
#         // sig: signature // using claimSignature record from beginning for this
#     )

leo run reveal_answer_game "{
    owner: aleo16hf8hfpwasnn9cf7k2c0dllc56nn7qt547qxgvgwu6pznw4trvqsx68kls.private,
    game_multisig: aleo1asu88azw3uqud282sll23wh3tvmvwjdz5vhvu2jwyrdwtgqn5qgqetuvr6.private,
    game_state: 2field.private,
    your_turn: true.private,
    total_pot: 200u64.private,
    challenger_address: aleo16hf8hfpwasnn9cf7k2c0dllc56nn7qt547qxgvgwu6pznw4trvqsx68kls.private,
    opponent_address: aleo1r4pc6ufjvw050jhzrew3vqm2lvacdxfd4a5ckulau0vjc72qvc8sr0jg2a.private,
    opponent_answer: 0field.private,
    ix: 8u32.private,
    _nonce: 1091792808197594721170902092665224630304882664167687449788333149679412516284group.public
    }" "{
    owner: aleo16hf8hfpwasnn9cf7k2c0dllc56nn7qt547qxgvgwu6pznw4trvqsx68kls.private,
    challenger_address: aleo16hf8hfpwasnn9cf7k2c0dllc56nn7qt547qxgvgwu6pznw4trvqsx68kls.private,
    opponent_address: aleo1r4pc6ufjvw050jhzrew3vqm2lvacdxfd4a5ckulau0vjc72qvc8sr0jg2a.private,
    game_multisig: aleo1asu88azw3uqud282sll23wh3tvmvwjdz5vhvu2jwyrdwtgqn5qgqetuvr6.private,
    amount: 100u64.private,
    nonce: 12345field.private,
    answer: 98765field.private,
    message_1: 8062328565641143710315198539395259864274213782537700083868207132716559019626field.private,
    message_2: 646976134778083579747150617209623060175268802563807996500102649727939562470field.private,
    message_3: 7738966642647861988443742254957166327730088714215632067055062293849087980027field.private,
    message_4: 501202936879316583063216806269060512965140130553350448375465909870676136661field.private,
    message_5: 478560413032field.private,
    ix: 1u32.private,
    _nonce: 8069166363212571197507892496914884693017996020436521525224559444902132897860group.public
  }" "{
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
    _nonce: 2470010722608988519677726442477530592921661968898332863336157467478307956734group.public
  }" "{
    owner: aleo16hf8hfpwasnn9cf7k2c0dllc56nn7qt547qxgvgwu6pznw4trvqsx68kls.private,
    sig: sign1h04lnsl0t4aau8lzp06rzcm5eqrzr9ew63ljnw43v2nr7nkmsqqcx8cksna2ajwgk80rv0s7prrndw5k56sey3nrl487552lvaukuq8xe0cgu6x809qetnn35ufm3gl6ecyvtpgaavu9y5754j27utrwq8amruqyq2x6dvqs790yqsrctwmjnh3k7thslm0r9c3hpdvjrywpzts24xr.private,
    amount: 100u64.private,
    game_multisig: aleo1asu88azw3uqud282sll23wh3tvmvwjdz5vhvu2jwyrdwtgqn5qgqetuvr6.private,
    challenger: aleo16hf8hfpwasnn9cf7k2c0dllc56nn7qt547qxgvgwu6pznw4trvqsx68kls.private,
    opponent: aleo1r4pc6ufjvw050jhzrew3vqm2lvacdxfd4a5ckulau0vjc72qvc8sr0jg2a.private,
    ix: 7u32.private,
    _nonce: 4194021521584400665115656892726113988149706319889301017657236676279353942892group.public
  }"


# Swap in the private key of the multisig.

echo "
NETWORK=testnet3
PRIVATE_KEY=APrivateKey1zkp8pmTMT4FxG5qXZ9McEYDdY1G6YokY1BYzwoxTYJEKubF
" > .env

echo "
#       :::::::::: ::::::::::: ::::    ::: ::::::::::: ::::::::  :::    :::
#      :+:            :+:     :+:+:   :+:     :+:    :+:    :+: :+:    :+:
#     +:+            +:+     :+:+:+  +:+     +:+    +:+        +:+    +:+
#    :#::+::#       +#+     +#+ +:+ +#+     +#+    +#++:++#++ +#++:++#++
#   +#+            +#+     +#+  +#+#+#     +#+           +#+ +#+    +#+
#  #+#            #+#     #+#   #+#+#     #+#    #+#    #+# #+#    #+#
# ###        ########### ###    #### ########### ########  ###    ###
#       ::::::::      :::       :::   :::   ::::::::::
#     :+:    :+:   :+: :+:    :+:+: :+:+:  :+:
#    +:+         +:+   +:+  +:+ +:+:+ +:+ +:+
#   :#:        +#++:++#++: +#+  +:+  +#+ +#++:++#
#  +#+   +#+# +#+     +#+ +#+       +#+ +#+
# #+#    #+# #+#     #+# #+#       #+# #+#
# ########  ###     ### ###       ### ##########
"

# transition finish_game
#     (
#         game_record: Game,
#         joint_piece_winner: puzzle_pieces_v008.leo/JointPieceWinner.record,
#         piece_joint_stake: puzzle_pieces_v008.leo/PieceJointStake.record,
#         joint_piece_time_claim: puzzle_pieces_v008.leo/JointPieceTimeClaim.record,
#     )

leo run finish_game "{
    owner: aleo1asu88azw3uqud282sll23wh3tvmvwjdz5vhvu2jwyrdwtgqn5qgqetuvr6.private,
    challenger_commit: 1632338669887332693450432112819554759682427161589172463360656597380489639523field.private,
    opponent_answer: 0field.private,
    total_pot: 200u64.private,
    challenger_address: aleo16hf8hfpwasnn9cf7k2c0dllc56nn7qt547qxgvgwu6pznw4trvqsx68kls.private,
    opponent_address: aleo1r4pc6ufjvw050jhzrew3vqm2lvacdxfd4a5ckulau0vjc72qvc8sr0jg2a.private,
    game_multisig: aleo1asu88azw3uqud282sll23wh3tvmvwjdz5vhvu2jwyrdwtgqn5qgqetuvr6.private,
    game_state: 2field.private,
    ix: 0u32.private,
    _nonce: 6948608249986613510548613368363016201727215274114585598126958153407391794356group.public
  }" "{
    owner: aleo1asu88azw3uqud282sll23wh3tvmvwjdz5vhvu2jwyrdwtgqn5qgqetuvr6.private,
    amount: 200u64.private,
    time_claimer_address: aleo1r4pc6ufjvw050jhzrew3vqm2lvacdxfd4a5ckulau0vjc72qvc8sr0jg2a.private,
    state_updater_address: aleo16hf8hfpwasnn9cf7k2c0dllc56nn7qt547qxgvgwu6pznw4trvqsx68kls.private,
    challenger: aleo16hf8hfpwasnn9cf7k2c0dllc56nn7qt547qxgvgwu6pznw4trvqsx68kls.private,
    opponent: aleo1r4pc6ufjvw050jhzrew3vqm2lvacdxfd4a5ckulau0vjc72qvc8sr0jg2a.private,
    game_multisig: aleo1asu88azw3uqud282sll23wh3tvmvwjdz5vhvu2jwyrdwtgqn5qgqetuvr6.private,
    winner: aleo16hf8hfpwasnn9cf7k2c0dllc56nn7qt547qxgvgwu6pznw4trvqsx68kls.private,
    ix: 12u32.private,
    _nonce: 2941739561580251680610526948102666726700629610306996571161200799611740404159group.public
  }" "{
    owner: aleo1asu88azw3uqud282sll23wh3tvmvwjdz5vhvu2jwyrdwtgqn5qgqetuvr6.private,
    amount: 200u64.private,
    time_claimer_address: aleo1r4pc6ufjvw050jhzrew3vqm2lvacdxfd4a5ckulau0vjc72qvc8sr0jg2a.private,
    state_updater_address: aleo16hf8hfpwasnn9cf7k2c0dllc56nn7qt547qxgvgwu6pznw4trvqsx68kls.private,
    block_ht: 100000u32.private,
    ix: 9u32.private,
    _nonce: 2240713899390860994917694134343841722032477963540160502162988371192957651151group.public
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
    block_ht: 100000u32.private,
    ix: 8u32.private,
    _nonce: 274384839497127952384736973185974643077364641215250178954909534832130043014group.public
  }"


  # transition finish_game_by_timeout(
  #       game_record: Game,
  #       piece_joint_stake: PieceJointStake,
  #       joint_piece_time_claim: JointPieceTimeClaim,
  #       opponent_sig: signature, // use from ClaimSignature record on FE, can't consume in this fxn bc claim is owned by multisig
  #   )

leo run finish_game_by_timeout "{
    owner: aleo1asu88azw3uqud282sll23wh3tvmvwjdz5vhvu2jwyrdwtgqn5qgqetuvr6.private,
    challenger_commit: 1632338669887332693450432112819554759682427161589172463360656597380489639523field.private,
    opponent_answer: 0field.private,
    total_pot: 200u64.private,
    challenger_address: aleo16hf8hfpwasnn9cf7k2c0dllc56nn7qt547qxgvgwu6pznw4trvqsx68kls.private,
    opponent_address: aleo1r4pc6ufjvw050jhzrew3vqm2lvacdxfd4a5ckulau0vjc72qvc8sr0jg2a.private,
    game_multisig: aleo1asu88azw3uqud282sll23wh3tvmvwjdz5vhvu2jwyrdwtgqn5qgqetuvr6.private,
    game_state: 2field.private,
    ix: 16u32.private,
    _nonce: 6948608249986613510548613368363016201727215274114585598126958153407391794356group.public
  }" "{
    owner: aleo1asu88azw3uqud282sll23wh3tvmvwjdz5vhvu2jwyrdwtgqn5qgqetuvr6.private,
    amount: 200u64.private,
    time_claimer_address: aleo1r4pc6ufjvw050jhzrew3vqm2lvacdxfd4a5ckulau0vjc72qvc8sr0jg2a.private,
    state_updater_address: aleo16hf8hfpwasnn9cf7k2c0dllc56nn7qt547qxgvgwu6pznw4trvqsx68kls.private,
    block_ht: 100000u32.private,
    ix: 9u32.private,
    _nonce: 2240713899390860994917694134343841722032477963540160502162988371192957651151group.public
  }" "{
    owner: aleo1asu88azw3uqud282sll23wh3tvmvwjdz5vhvu2jwyrdwtgqn5qgqetuvr6.private,
    amount: 200u64.private,
    time_claimer_address: aleo1r4pc6ufjvw050jhzrew3vqm2lvacdxfd4a5ckulau0vjc72qvc8sr0jg2a.private,
    state_updater_address: aleo16hf8hfpwasnn9cf7k2c0dllc56nn7qt547qxgvgwu6pznw4trvqsx68kls.private,
    message_1: 4299148155668445410404796665478412871867472362428312345599969289162437917169field.private,
    message_2: 251561861986387641133995513088278466362266230978294643355666629668300490271field.private,
    message_3: 1152742118437172617676919179607096353215168002720611159713055309066048881777field.private,
    message_4: 6965356107999508170054292104522311809055538516545196583411503498743541220125field.private,
    message_5: 478560413032field.private,
    game_multisig: aleo1asu88azw3uqud282sll23wh3tvmvwjdz5vhvu2jwyrdwtgqn5qgqetuvr6.private,
    challenger: aleo16hf8hfpwasnn9cf7k2c0dllc56nn7qt547qxgvgwu6pznw4trvqsx68kls.private,
    opponent: aleo1r4pc6ufjvw050jhzrew3vqm2lvacdxfd4a5ckulau0vjc72qvc8sr0jg2a.private,
    block_ht: 100000u32.private,
    ix: 8u32.private,
    _nonce: 274384839497127952384736973185974643077364641215250178954909534832130043014group.public
  }" sign1j0hhruukxrlddx4tzzpe8gccgy3l430el69e0jpclrzk2x3kecpq7zteu9z5qqqttk4xltyplgwzt4famkfxar5wjncz5ttssdur2qslse2uz49ljzhxz82y28gy0un45z8w2jgwk7jhdgxqh58qgcvwqpcuf9estpjsv9n9jln3x08mzl2rc8z25j6s6r4uf8rq9r7ddkxqyaahcxh
