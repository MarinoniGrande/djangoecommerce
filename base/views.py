from django.http import JsonResponse
from django.shortcuts import render
import core.models


def home(request):
    """
    Função para login automático por meio de uma url vazia.
    :param request: Informações da requisição
    :return: Login do usuário.
    """

    categorias = core.models.Category.objects.all().filter(ist_status=True, parent=None).order_by('name')

    produtos = core.models.Product.objects.all().filter(ist_status=True).order_by('name')

    return render(request, 'projeto/home.html', {'produtos': produtos, 'categorias': categorias})


def procurar_produtos(request):
    nome = request.POST.get('nome')

    produtos = list(core.models.Product.objects.values('name', 'id').filter(ist_status=True, name__icontains=nome).order_by('name'))

    return JsonResponse({'produtos': produtos}, safe=False)