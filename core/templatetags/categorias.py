import datetime
from django import template

register = template.Library()


@register.inclusion_tag('projeto/tree_stucture.html')
def tree_structure(category):
    subs = category.subs.all().filter(ist_status=True).order_by('name')
    return {"subs": subs}